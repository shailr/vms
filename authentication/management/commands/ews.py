from django.core.management.base import BaseCommand, CommandError
from applicants.models import Applicant
from stages.models import Stage
from applications.models import Application
from tags.models import Tag
from notes.models import Note
from authentication.models import Account

import csv
import json


class Command(BaseCommand):
    help = 'Does some magical work'

    def createNote(self, note, app):
        if note != '0':
            creator = Account.objects.get(pk=1)
            Note.objects.create(note=note, creator=creator, applicant=app)

    def handle(self, *args, **options):
        stage = Stage.objects.get(name='Last Year Applicants')
        application = Application.objects.get(pk=1)

        with open('/Users/jojjen/july.csv') as data:
            reader = csv.reader(data)

            count = 0

            for row in reader:
                if 'Unknown' in row[0]:
                    continue
                count += 1
                data = {
                    'address': {},
                    'birth': {},
                    'income': {},
                    'category': {},
                    'disability': {},
                    'orphan': {},
                    'number_children': 0,
                    'children': [],
                    'cat': {},
                    'knowledge': {}
                }
                query = {}
                info = {}

                data['org'] = row[1]
                data['father_name'] = row[2]
                data['mother_name'] = row[3]
                data['category'] = row[4]
                data['num_children'] = int(row[5])
                children = row[6]

                children = children.replace('|', ',')
                children = json.loads(children)

                if not isinstance(children, list):
                    children = []

                for child in children:
                    try:
                        int(child['age'])
                        child['age'] = int(child['age'])
                    except:
                        child['age'] = 0

                data['children'] = children

                data['alternate_number'] = row[7]
                data['address']['house_no'] = row[8]
                data['address']['area'] = row[9]
                data['address']['locality'] = row[10]
                data['address']['pin'] = row[11]

                data['income']['ration'] = not not int(row[12])
                data['income']['aadhar'] = not not int(row[13])
                data['birth']['anganwadi'] = not not int(row[14])
                data['income']['bpl'] = not not int(row[15])
                data['birth']['birth'] = not not int(row[16])
                data['cat']['caste'] = not not int(row[17])
                data['address']['bill'] = not not int(row[18])
                data['income']['food'] = not not int(row[19])
                data['birth']['hospital'] = not not int(row[20])
                data['income']['income'] = not not int(row[21])
                data['address']['licence'] = not not int(row[22])
                data['disability']['medical'] = not not int(row[23])
                data['orphan']['orphan'] = not not int(row[24])
                data['address']['pan'] = not not int(row[25])
                data['address']['ration'] = not not int(row[26])
                data['birth']['self'] = not not int(row[27])
                data['address']['voter'] = not not int(row[28])
                data['knowledge']['rte'] = not not int(row[29])
                data['knowledge']['docs'] = not not int(row[30])
                data['knowledge']['school'] = not not int(row[31])

                info['anganwadi'] = not not int(row[32])
                info['community_champion'] = not not int(row[35])
                info['grc'] = not not int(row[36])
                info['other'] = not not int(row[41])
                info['tv'] = not not int(row[42])
                info['database'] = not not int(row[44])

                if count % 2 == 0:
                    info['neighbour_male'] = not not int(row[45])
                    info['neighbour_female'] = not not int(row[48])
                    info['relative_male'] = not not int(row[53])
                else:
                    info['neighbour_female'] = not not int(row[45])
                    info['neighbour_male'] = not not int(row[48])
                    info['relative_female'] = not not int(row[53])

                info['husband_wife'] = not not int(row[46])
                info['newspaper'] = not not int(row[49])
                info['pamphlet'] = not not int(row[50])
                info['poster'] = not not int(row[51])
                info['pratham'] = not not int(row[52])
                info['sticker'] = not not int(row[55])
                info['street_play'] = not not int(row[56])

                query['app1a'] = not not int(row[57])
                query['app1b'] = not not int(row[58])
                query['app1c'] = not not int(row[59])
                query['app1d'] = not not int(row[50])
                query['app1e'] = not not int(row[61])
                query['app1f'] = not not int(row[62])
                query['app1g'] = not not int(row[63])
                query['app2a'] = not not int(row[64])
                query['app2b'] = not not int(row[65])
                query['app2c'] = not not int(row[66])
                query['app2d'] = not not int(row[67])
                query['app2e'] = not not int(row[68])
                query['app2f'] = not not int(row[69])
                query['app2g'] = not not int(row[70])
                query['app2h'] = not not int(row[71])
                query['app2i'] = not not int(row[72])
                query['app2j'] = not not int(row[73])
                query['app2k'] = not not int(row[74])
                query['app2l'] = not not int(row[75])
                query['app3b'] = not not int(row[76])
                query['app3e'] = not not int(row[77])

                query['doc1a'] = not not int(row[78])
                query['doc1b'] = not not int(row[79])
                query['doc1d'] = not not int(row[80])
                query['doc1e'] = not not int(row[81])
                query['doc1f'] = not not int(row[82])
                query['doc1g'] = not not int(row[83])
                query['doc1h'] = not not int(row[84])
                query['doc3a'] = not not int(row[85])
                query['doc3b'] = not not int(row[86])
                query['doc3e'] = not not int(row[87])
                query['doc3f'] = not not int(row[88])

                query['info1a'] = not not int(row[89])
                query['info1b'] = not not int(row[90])
                query['info1c'] = not not int(row[91])
                query['info1d'] = not not int(row[92])
                query['info2a'] = not not int(row[93])
                query['info2b'] = not not int(row[94])
                query['info2c'] = not not int(row[95])
                query['info2d'] = not not int(row[96])
                query['info2e'] = not not int(row[97])
                query['info2f'] = not not int(row[98])
                query['info2g'] = not not int(row[99])

                query['lot1a'] = not not int(row[100])
                query['lot1b'] = not not int(row[101])
                query['lot1c'] = not not int(row[102])
                query['lot1e'] = not not int(row[103])
                query['lot2a'] = not not int(row[104])
                query['lot2b'] = not not int(row[105])
                query['lot2c'] = not not int(row[106])
                query['lot3a'] = not not int(row[107])
                query['lot3b'] = not not int(row[108])
                query['lot3c'] = not not int(row[109])
                query['lot3d'] = not not int(row[110])
                query['lot3e'] = not not int(row[111])
                query['lot3f'] = not not int(row[112])

                data['rel_mobile'] = row[117]
                data['mother_occupation'] = row[120]
                data['father_occupation'] = row[121]
                try:
                    int(row[122])
                    data['motivated'] = not not int(row[122])
                except:
                    data['motivated'] = False

                try:
                    app, created = Applicant.objects.get_or_create(mobile=row[0])
                    if created:
                        app.data=json.dumps(data)
                        app.query=json.dumps(query)
                        app.info=json.dumps(info)
                        app.stage=stage
                        app.created_by=assignee
                        app.application=application

                    self.createNote(row[113], app)
                    self.createNote(row[114], app)
                    self.createNote(row[115], app)
                    self.createNote(row[116], app)
                    self.createNote('Number of applications: ' + row[118], app)
                    self.createNote('Status: ' + row[119], app)

                    if data['motivated']:
                        t = Tag.objects.get(tag="Motivated")
                        t.applicants.add(app)

                        t.save()

                    app.save()

                    print count

                except:
                    print "some failure. continuing..."

                    pass
