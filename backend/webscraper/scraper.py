import requests
from bs4 import BeautifulSoup
import pandas as pd

def scrape(url):
    HEADERS ={
    "User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:66.0) Gecko/20100101 Firefox/66.0", 
    "Accept-Encoding":"gzip, deflate", 
    "Accept":"text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8", 
    "DNT":"1",
    "Connection":"close", 
    "Upgrade-Insecure-Requests":"1"}
    r = requests.get(url, headers=HEADERS)
    htmlContent = r.content
    soup = BeautifulSoup(htmlContent, features='html.parser')
    doc = soup.find_all("div",{"class":"a-column a-span12 a-text-center _cDEzb_grid-column_2hIsc"})
    list1 = []
    for j in doc[:10]:
        list1.append({'link':'https://www.amazon.in'+j.find_all('a')[0]['href'], 'name':j.find_all('a')[1].get_text(), 'price':j.find_all('a')[3].get_text(), 'img':j.find('img')['src']})
    return list1