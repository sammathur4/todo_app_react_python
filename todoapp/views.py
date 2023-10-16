from django.shortcuts import render, get_object_or_404

from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from .models import *
from .serializers import *


@api_view(['GET', 'POST'])
def todo_list(request):
    if request.method == 'GET':
        todos = Todo.objects.all()
        serializers = TodoSerializer(todos, many=True)
        return Response(serializers.data)


    elif request.method == 'POST':
        serializers = TodoSerializer(data=request.data)
        if serializers.is_valid():
            serializers.save()
            return Response(serializers.data, status=status.HTTP_201_CREATED)
        return Response(serializers.errors, status=status.HTTP_400_BAD_REQUEST)



@api_view(['GET', 'PATCH', 'PUT', 'DELETE'])
def todo_detail(request, pk):
    todo = get_object_or_404(Todo, id = pk)

    if request.method =='GET':
        serializers = TodoSerializer(todo)
        return Response(serializers.data)

    elif request.method=='PATCH':
        serializers = TodoSerializer(todo, data = request.data)
        if serializers.is_valid():
            serializers.save()
            return Response(serializers.data)
        return Response(serializers.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method=='DELETE':
        todo.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

