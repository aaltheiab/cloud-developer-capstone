with open("data.txt") as fp: 
    lines = fp.readlines() 
    
    for line in lines: 
        result = line.strip().split(' ')
        sku = result[0]
        height = result[1]
        width = result[2]
        length = result[3]
        print("SKU: {} , HE: {} , WID: {} , LEN: {} ".format(sku, height, width, length))

