print("hello py!")

x = 3

print(3 < x < 5)
print(3 < x or x < 5)
print(not x > 3)

age = 15

if age >= 18:
    print("성인입니다.")
elif age >= 13:
    print("청소년입니다.")
else:
    print("어린이")

for i in range(3):
    print(i)

for i in range(1, 5, 2):
    print(i)

num = 5

while num > 0:
    print(num)
    num -= 1


def sayHi(str):
    print(f"{str} 안녕~!")


sayHi("sw")


# 리스트
fruits = ["apple", "banana", "mango"]

print(fruits[0])


import math

print(math.ceil(1.3))
print(math.sqrt(16))


# 쓰기
with open("C:/Users/soldesk/Desktop/sw/spring_practice/python/test.txt", "w") as f:
    f.write("hellow?")


# 읽기
with open("C:/Users/soldesk/Desktop/sw/spring_practice/python/test.txt", "r") as f:
    print(f.read())


try:
    result = 10 / 0
except ZeroDivisionError:
    print("/0 no no")


# 튜플(불변)
my_tuple = 1, 2, 3
print(my_tuple)
print(my_tuple[1])

# fruits.append("test")
# my_tuple.append(4) X


# 길이
print(len(my_tuple))
t1 = 1, 2
t2 = 3, 5
t3 = t1 + t2
print(t1)
print(t2)
print(t3)


# 하나만 쓸때는 필수 (,)
t4 = (1,)
print(type(t4))


# 복수의 리턴값은 튜플로 반환
def calc(a, b):
    return a + b, a * b


result = calc(1, 5)
print(result)


hap, gob = result
print(hap)
print(gob)
