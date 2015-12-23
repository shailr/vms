from rest_framework import permissions, viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import list_route

from locations.models import Location
from locations.serializers import LocationSerializer


class LocationViewSet(viewsets.ModelViewSet):
    queryset = Location.objects.order_by('address')
    serializer_class = LocationSerializer

    def get_permissions(self):
        if self.request.method in permissions.SAFE_METHODS:
            return (permissions.AllowAny(),)

        if self.request.method == 'POST':
            return (permissions.AllowAny(),)

        return False

    @list_route()
    def search(self, request):
        search_text = request.GET.get('search')

        locations_new = Location.objects.filter(address__icontains=search_text)
        serializer = LocationSerializer(locations_new, many=True)

        return Response(serializer.data)
