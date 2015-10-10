from django.conf.urls import patterns, include, url
from django.conf import settings
from django.conf.urls.static import static

from rest_framework_nested import routers

from authentication.views import AccountViewSet, LoginView, LogoutView
from organizations.views import OrganizationViewSet
from applications.views import ApplicationViewSet

from views import DefaultTemplateView
# Uncomment the next two lines to enable the admin:
# from django.contrib import admin
# admin.autodiscover()

router = routers.SimpleRouter()
router.register(r'accounts', AccountViewSet)
router.register(r'organizations', OrganizationViewSet)
router.register(r'applications', ApplicationViewSet)

urlpatterns = patterns(
    '',

    url(r'^api/v1/', include(router.urls)),

    url(r'^api/v1/auth/login/$', LoginView.as_view(), name='login'),

    url(r'^api/v1/auth/logout/$', LogoutView.as_view(), name='logout'),

    url(r'^.*$', DefaultTemplateView.as_view()),
)
