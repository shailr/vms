from django.http import HttpResponse
from django.views.generic import View
from django.views.generic import TemplateView
from django.http import JsonResponse

class HelloWorldView(View):
  def get(self, request, *args, **kwargs):
    d = {
        "name" : "kuldeep fouzdar",
        "age" : 22
        }
    return HttpResponse(JsonResponse(d))

class DefaultTemplateView(TemplateView):
  template_name = "index.html"
