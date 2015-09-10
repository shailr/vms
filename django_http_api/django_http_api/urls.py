from django.conf.urls import patterns, include, url
from django.conf import settings
from django.conf.urls.static import static

from rest_framework_nested import routers

from authentication.views import AccountViewSet

from views import HelloWorldView
from views import DefaultTemplateView
# Uncomment the next two lines to enable the admin:
# from django.contrib import admin
# admin.autodiscover()

router = routers.SimpleRouter()
router.register(r'accounts', AccountViewSet)

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'django_http_api.views.home', name='home'),
    # url(r'^django_http_api/', include('django_http_api.foo.urls')),
    # Uncomment the admin/doc line below to enable admin documentation:
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),
    # Uncomment the next line to enable the admin:
    # url(r'^admin/', include(admin.site.urls)),
    url(r'^_/hello_world$', HelloWorldView.as_view()),

    url(r'^api/v1/', include(router.urls)),

    url(r'^$', DefaultTemplateView.as_view()),
)
