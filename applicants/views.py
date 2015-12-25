from django.db.models import Q
from django.core.paginator import Paginator

from rest_framework import permissions, viewsets
from rest_framework.response import Response
from rest_framework.decorators import list_route

from applicants.models import Applicant
from applicants.serializers import ApplicantSerializer

from organizations.models import Organization

from authentication.permissions import IsAccountOwner

from applications.models import Application


class ApplicantViewSet(viewsets.ModelViewSet):
    queryset = Applicant.objects.order_by('created_at')
    serializer_class = ApplicantSerializer

    def get_permissions(self):
        if self.request.method in permissions.SAFE_METHODS:
            return (permissions.AllowAny(),)
        if self.request.method == 'POST' or self.request.method == 'PUT':
            return (permissions.AllowAny(),)

        return False

    def perform_create(self, serializer):
        instance = serializer.save(created_by=self.request.user,
                                   application=self.request.data['application'])

        return super(ApplicantViewSet, self).perform_create(serializer)

    @list_route()
    def starred(self, request):
        applicants = Applicant.objects.filter(starred=True)

        serializer = self.get_serializer(applicants, many=True)

        return Response(serializer.data)

    @list_route()
    def search(self, request):
        search_text = request.GET.get('search')

        applicants_new = Applicant.objects.filter(Q(mobile__contains=search_text) | Q(data__contains=search_text))
        serializer = self.get_serializer(applicants_new, many=True)

        return Response(serializer.data)


class ApplicationApplicantsViewSet(viewsets.ModelViewSet):
    queryset = Applicant.objects.all()
    serializer_class = ApplicantSerializer

    def list(self, request, application_pk=None):
        queryset = self.queryset.filter(application__pk=application_pk)
        applicants = self.paginate_queryset(queryset)

        if applicants is not None:
            serializer = self.get_serializer(applicants, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    @list_route()
    def starred(self, request):
        applicants = Applicant.objects.filter(starred=True)

        serializer = self.get_serializer(applicants, many=True)

        return Response(serializer.data)

    @list_route()
    def archived(self, request):
        applicants = Applicant.objects.filter(archived=True)

        serializer = self.get_serializer(applicants, many=True)

        return Response(serializer.data)


class StageApplicantsViewSet(viewsets.ViewSet):
    queryset = Applicant.objects.all()
    serializer_class = ApplicantSerializer

    def list(self, request, stage_pk=None):
        queryset = self.queryset.filter(stage__pk=stage_pk)
        serializer = self.serializer_class(queryset, many=True)

        return Response(serializer.data)


class TagApplicantsViewSet(viewsets.ViewSet):
    queryset = Applicant.objects.all()
    serializer_class = ApplicantSerializer

    def list(self, request, tag_pk=None):
        queryset = self.queryset.filter(tags__pk=tag_pk)
        serializer = self.serializer_class(queryset, many=True)

        return Response(serializer.data)


class AccountApplicantsViewSet(viewsets.ViewSet):
    queryset = Applicant.objects.all()
    serializer_class = ApplicantSerializer

    def list(self, request, account_pk=None):
        queryset = self.queryset.filter(assignee__pk=account_pk)
        serializer = self.serializer_class(queryset, many=True)

        return Response(serializer.data)
