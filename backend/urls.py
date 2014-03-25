import os

from django.conf.urls import patterns, url, include
from django.contrib import admin
from django.conf import settings

from rest_framework import routers

from content import views


admin.autodiscover()


router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'content', views.ContentViewSet)


# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browseable API.
urlpatterns = patterns('',
    url(r'^api/', include(router.urls)),
    url(r'^api/account/', include('userena_rf.urls', namespace='userena_rf')),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^admin/', include(admin.site.urls)),
)

# if settings.DEBUG:
#     urlpatterns += patterns('',
#         url(r'^client/(?P<path>.*)$', 'django.views.static.serve', {
#             'document_root': os.path.join(settings.BASE_DIR, 'client', 'app'),
#             'show_indexes': True,
#         }),
#    )
