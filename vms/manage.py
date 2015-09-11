#!/usr/bin/env python
import os
import sys

if __name__ == "__main__":
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "django_http_api.settings")
    # Option parser to be able to pass sensitive information like password from command-prompt

    from django.core.management import execute_from_command_line

    execute_from_command_line(sys.argv)
