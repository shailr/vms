from django.db import models

from core.models import TimeStampedModel

from applicants.models import Applicant


class ApplicationInfo(TimeStampedModel):
    applicant = models.OneToOneField(Applicant)

    username = models.CharField(max_length=30, blank=True)
    organization_name = models.CharField(max_length=30, blank=True)

    phone = models.CharField(max_length=20, blank=True)
    #TODO add support for multiple numbers

    CATEGORY_CHOICES = (
        (1, u'EWS'),
        (2, u'SC/ST'),
        (3, u'OBC (Non-creamy)'),
        (4, u'Physically/Mentally Challenged'),
        (5, u'Orphan'),
        (6, u'Transgender'),
    )
    category = models.IntergerField(choices=CATEGORY_CHOICES,
                                    default=1)

    #TODO: Add a model for applicant_children

    father_name = models.CharField(max_length=30)
    father_occupation = models.CharField(max_length=30)

    mother_name = models.CharField(max_length=30)
    mother_occupation = models.CharField(max_length=30)

    ADDRESS_PROOF_CHOICES = (
        (0, u'None'),
        (1, u'Aadhar Card'),
        (2, u'PAN Card'),
        (3, u'Ration Card'),
        (4, u'Voter Card'),
        (5, u'License'),
        (6, u'Electricity/Water Bill'),
    )
    address_proof = models.IntegerField(choices=ADDRESS_PROOF_CHOICES,
                                        default=0)

    BIRTH_CERTIFICATE_CHOICES = (
        (0, u'None'),
        (1, u'Hospital Record'),
        (2, u'Anganwadi Record'),
        (3, u'Birth Certificate'),
        (4, u'Self Affidavit'),
    )
    birth_certificate = models.IntergerField(choices=BIRTH_CERTIFICATE_CHOICES,
                                             default=0)

    INCOME_CERTIFICATE_CHOICES = (
        (0, u'None'),
        (1, u'BPL Card'),
        (2, u'AAY Ration Card'),
        (3, u'Food Security Card'),
        (4, u'Income Certificate'),
    )
    income_certificate = models.IntegerField(choices=INCOME_CERTIFICATE_CHOICES,
                                             default=0)

    CATEGORY_CERTIFICATE_CHOICES = (
        (0, u'None'),
        (1, u'Delhi Caste Certificate'),
    )
    category_certificate = models.IntegerField(choices=CATEGORY_CERTIFICATE_CHOICES,
                                               default=0)

    DISABILITY_CERTIFICATE_CHOICES = (
        (0, u'None'),
        (1, u'Medical Certificate from Government Hospital'),
    )
    disability_certificate = models.IntegerField(choices=DISABILITY_CERTIFICATE_CHOICES,
                                                 default=0)

    ORPHAN_CERTIFICATE_CHOICES = (
        (0, u'None'),
        (1, u'Certificate from WCD'),
    )
    orphan_certificate = models.IntergerField(choices=ORPHAN_CERTIFICATE_CHOICES,
                                              default=0)

    alternate_phone = models.CharField(max_length=20)

    house_no = models.CharField(max_length=10)

    #TODO CHECK WITH CHHABRA FOR AREA AND LOCALITY
    area = models.CharField(max_length=30)
    locality = models.CharField(max_length=30)

    pincode = models.CharField(max_length=10)

    knowledge_rte = models.BooleanField()
    knowledge_documentation = models.BooleanField()
    knowledge_school = models.BooleanField()
