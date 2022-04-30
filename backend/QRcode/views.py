from pdb import runcall
import phonenumbers
from rest_framework.views import APIView
from rest_framework.response import Response

from . import models
from Account.models import Profile
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated

import qrcode
from datetime import datetime
import re

from PIL import Image
import base64
import io

from .serializers import QrSerializer


# Create your views here.

#사용자가 구매한 QR코드 스티커의 제공형태
class QRmakeView(APIView):
    def post(self, request):

        qrcode_o = models.QRcode()
       
        qrcode_ = qrcode.QRCode(
            version=1,
            box_size = 10,
        )

        key = str(datetime.now())
        key = re.sub(r'[^0-9]', '', key)
        qrcode_.add_data(key)
        qrcode_o.key = key

        img = qrcode_.make_image()
        qrlink = "static/qrcode"+key+".png"
        img.save(qrlink)
        # qrcode_o.qr_img = Image.open(qrlink)
        qrcode_o.qr_url = qrlink
        
        qrcode_o.save()

        return Response({"qrcode":"makeQR","key":key})

#사용자는 웹앱을 통해 qrcode에 적힌 key코드로 해당 큐얼코드에 로그인후 데이터 등록
class QRsaveView(APIView):

    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):

        print(request.data)

        qrcode =  models.QRcode.objects.get(key = request.data['key'])
        # qrcode를 scan하면 key가 읽히고 qrsave api를 사용하여 key를 가지고 qrcode를 찾아서 데이터를 수정 후 저장.
        
        qrcode.is_null = False
        # 사용자가 정해지게 됨.
        qrcode.text = request.data['text']
        qrcode.title = request.data['title']

        profile = Profile.objects.get(user = request.user)
        qrcode.profile = profile
        qrcode.save()

        return Response({"message":"save"})

# {"key":"20220325031516263584","text":"text"}

# 사용자가 qrcode scan -> qrcode에 들어있던 key값을 활용해 qrcode data를 보여줌.
class QRdataView(APIView):

    def get(self, request):

        key = request.GET['key'] #parameter를 받을 때, request.GET 사용.
        
        qrcode = models.QRcode.objects.get(key = key)

        is_null = qrcode.is_null
        memo = qrcode.text
        if(qrcode.profile):
            title = qrcode.title
            address = qrcode.profile.address
            phonenumber = str(qrcode.profile.PhoneNumber)
            data = {
            "is_null" : is_null,
            "title" : title,
            "memo" : memo,
            "address" : address,
            "phonenumber" : phonenumber  }
        else:
            data = {
            "is_null" : is_null,
            "memo" : memo, }

        

        

        return Response(data)

# 로그인한 user가 가지고 있는 qrcode에 대한 정보들을 보여주는 페아지를 위한 api생성
class UserQrView(APIView):
    
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):

        profile = Profile.objects.get(user = request.user)
        qrcode = models.QRcode.objects.filter(profile = profile)

        for i in range(0,len(qrcode)):
            qrcode[i].count = str(i+1)

        serializer = QrSerializer(qrcode, many=True)

        return Response(serializer.data)


