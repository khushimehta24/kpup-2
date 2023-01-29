import cv2
import torch
from PIL import Image

# model = torch.hub.load('ultralytics/yolov5', 'custom', path='path/to/best.pt')  # local model
def fruit_detection(img):
    model = torch.hub.load('C:\\Users\\khush\\BitNBuildTest\\backend\\fruits\\yolov5', 'custom', path='C:\\Users\\khush\\BitNBuildTest\\backend\\fruits\\best.pt', source='local')  # local repo

    im_path = img

    # Inference
    results = model(im_path) # batch of images

    # Results
    results.print()  
    results.save()  # or .show()

    df = results.pandas().xyxy[0]
    return df