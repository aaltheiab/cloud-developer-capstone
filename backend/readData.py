

with open("data.txt") as fp: 
    lines = fp.readlines() 
    lis = {}
    [{
       "url": "https://aaltheiab-serverless-capstone-dev.s3.amazonaws.com/114.jpeg",
    },


        "https://aaltheiab-serverless-capstone-dev.s3.amazonaws.com/116.jpeg",
        "https://aaltheiab-serverless-capstone-dev.s3.amazonaws.com/127.jpeg",
        "https://aaltheiab-serverless-capstone-dev.s3.amazonaws.com/138.jpeg",
        "https://aaltheiab-serverless-capstone-dev.s3.amazonaws.com/139.jpeg",
        "https://aaltheiab-serverless-capstone-dev.s3.amazonaws.com/145.jpeg",
        "https://aaltheiab-serverless-capstone-dev.s3.amazonaws.com/150.jpeg"
    ]

    for line in lines: 
        result = line.strip().split(" ")
        sku = result[0]
        height = result[1]
        width = result[2]
        length = result[3]

        lis[sku] = {
            "height": height,
            "width": width,
            "length": length
        }
        
    
    print(lis)
        

import requests
URL = "https://kpkzrk2tc7.execute-api.us-east-1.amazonaws.com/dev/boxes"
def postBox():


    
    myobj = {"somekey": "somevalue"}
    x = requests.post(URL, data = myobj)

    print(x.text)


[
    {"attachmentUrl": "https://aaltheiab-serverless-capstone-dev.s3.amazonaws.com/116.jpeg", "height": 20, "width": 35, "sku": "116", "leng": 50},
    {"attachmentUrl": "https://aaltheiab-serverless-capstone-dev.s3.amazonaws.com/114.jpeg", "height": 14.5, "width": 33.5, "sku": "114", "leng": 73},
    {"attachmentUrl": "https://aaltheiab-serverless-capstone-dev.s3.amazonaws.com/127.jpeg", "height": 14.5, "width": 22, "sku": "127", "leng": 33},
    {"attachmentUrl": "https://aaltheiab-serverless-capstone-dev.s3.amazonaws.com/138.jpeg", "height": 9.3, "width": 21, "sku": "138", "leng": 28.5},
    {"attachmentUrl": "https://aaltheiab-serverless-capstone-dev.s3.amazonaws.com/139.jpeg", "height": 19.7, "width": 26.9, "sku": "139", "leng": 39.8},
    
    
    {"attachmentUrl": "https://aaltheiab-serverless-capstone-dev.s3.amazonaws.com/145.jpeg", "height": 26.7, "width": 30.8, "sku": "145", "leng": 51.5},
    {"attachmentUrl": "https://aaltheiab-serverless-capstone-dev.s3.amazonaws.com/150.jpeg", "height": 8, "width": 28, "sku": "150", "leng": 28}
 ]