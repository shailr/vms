from django.conf.urls import patterns, include, url
from django.conf import settings
from django.conf.urls.static import static

from rest_framework_nested import routers

from authentication.views import AccountViewSet, LoginView, LogoutView
from organizations.views import OrganizationViewSet
from applications.views import ApplicationViewSet
from applicants.views import ApplicantViewSet, ApplicationApplicantsViewSet, StageApplicantsViewSet
from stages.views import ApplicationStagesViewSet, StageViewSet, AccountStagesViewSet
from notes.views import NoteViewSet, ApplicantNotesViewSet
from applicant_messages.views import MessagesViewSet, ApplicantMessagesViewSet

from views import DefaultTemplateView
# Uncomment the next two lines to enable the admin:
# from django.contrib import admin
# admin.autodiscover()

router = routers.SimpleRouter()
router.register(r'accounts', AccountViewSet)
router.register(r'organizations', OrganizationViewSet)
router.register(r'applications', ApplicationViewSet)
router.register(r'stages', StageViewSet)
router.register(r'applicants', ApplicantViewSet)
router.register(r'notes', NoteViewSet)
router.register(r'applicant_messages', MessagesViewSet)

applications_router = routers.NestedSimpleRouter(
    router, r'applications', lookup='application'
)
applications_router.register(r'stages', ApplicationStagesViewSet)
applications_router.register(r'applicants', ApplicationApplicantsViewSet)

applicants_router = routers.NestedSimpleRouter(
    router, r'applicants', lookup='applicant'
)
applicants_router.register(r'notes', ApplicantNotesViewSet)
applicants_router.register(r'applicant_messages', ApplicantMessagesViewSet)

stages_router = routers.NestedSimpleRouter(
    router, r'stages', lookup='stage'
)
stages_router.register(r'applicants', StageApplicantsViewSet)

accounts_router = routers.NestedSimpleRouter(
    router, r'stages', lookup='stage'
)
accounts_router.register(r'stages', AccountStagesViewSet)

urlpatterns = patterns(
    '',

    url(r'^api/v1/', include(router.urls)),

    url(r'^api/v1/auth/login/$', LoginView.as_view(), name='login'),

    url(r'^api/v1/auth/logout/$', LogoutView.as_view(), name='logout'),

    url(r'^api/v1/', include(applications_router.urls)),

    url(r'^api/v1/', include(applicants_router.urls)),

    url(r'^api/v1/', include(stages_router.urls)),

    url(r'^api/v1/', include(accounts_router.urls)),

    url(r'^.*$', DefaultTemplateView.as_view()),
)
