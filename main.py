#  백앤드에게 정보를 보내는 방법들
# 1. path parameter
# 2. query parameter
# 3. request body

#  path와 query는 어떨때 써야 할까?
# path : 어떤 리소스를 식별하고 싶으면  /users/123  --> id가 123인 user
# query: 정렬이나 필터링을 한다면  /users?age=20  --> 나이가 20살인 users

from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.staticfiles import StaticFiles

# app = FastAPI()

# class Item(BaseModel):
#     id:int
#     content:str
    
# # get: 조회 할때
# @app.get("/hello")
# def sayHello():
#     return {"message": "안녕하세요 슈퍼코딩!"}

# items = ['맥북', '애플워치', '아이폰', '에어팟']

# # @app.get("/items")
# # def read_items():
# #     return items

# @app.get('/items/{id}')
# def read_id_item(id):
#     return items[int(id)]

# # query parameter : ? 사용
# @app.get('/items')
# def read_item(skip:int=0, limit:int=10):
#     return items[skip:skip+limit]

# # post: update 할때
# # request body 사용
# @app.post("/items")
# #  ** item:Item 부분 이해 잘 안감!
# def post_item(item:Item):
#     items.append(item.content)
#     return '성공했습니다!'

app = FastAPI()

answer='TRAIN'

@app.get('/answer')
def get_answer():
    return answer
app.mount("/", StaticFiles(directory="static", html=True), name="static")