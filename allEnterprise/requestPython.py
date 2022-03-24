import requests
from io import BytesIO
from zipfile import ZipFile
from xml.etree.ElementTree import parse
import json
import datetime

API_KEY = "1686e3d1e31838bb84af6e6510cb821f0a9fd1c0"
EnterpriseInherenceURL = "https://opendart.fss.or.kr/api/corpCode.xml"

params = { 'crtfc_key': API_KEY }

res = requests.get(EnterpriseInherenceURL,params)

with ZipFile(BytesIO(res.content)) as zipfile:
  zipfile.extractall('./')

xmlTree = parse('./CORPCODE.xml')

root = xmlTree.getroot()
list = root.findall('list')

corps = []

for x in list:
  stock_code = x.findtext('stock_code')
  if stock_code != " ":
    corp_code = x.findtext('corp_code')
    corp_name = x.findtext('corp_name')
    corps.append({'corp_code':corp_code,'corp_name':corp_name})
    print(stock_code)

print(len(corps))

corpsJson = {
  'updateDate': str(datetime.datetime.now()),
  'corpsList': corps,
}

with open('../corpsList/corps.json', 'w') as f:
  json.dump(corpsJson,f,ensure_ascii=False)



