from django.http import HttpResponse
from django.views.generic import View
from django.views.generic import TemplateView
from django.http import JsonResponse


class DefaultTemplateView(TemplateView):
    template_name = "index.html"
