# Lesson Requests

```json
[
  {
    "title": "مفهوم تطبيقات الهواتف الذكية",
    "lesson_order": 1,
    "subject_id": 1
  },
  {
    "title": "مراحل إنتاج تطبيقات الهواتف الذكية",
    "lesson_order": 2,
    "subject_id": 1
  },
  {
    "title": "معايير تصميم تطبيقات الهواتف الذكية",
    "lesson_order": 3,
    "subject_id": 1
  },
  {
    "title": "مقدمة في لغة Dart",
    "lesson_order": 1,
    "subject_id": 2
  },
  {
    "title": "أنواع البيانات",
    "lesson_order": 2,
    "subject_id": 2
  },
  {
    "title": "المتغيرات والثوابت",
    "lesson_order": 3,
    "subject_id": 2
},
{
    "title": "المشغلات",
    "lesson_order": 4,
    "subject_id": 2
},
{
    "title": "الجمل الشرطية",
    "lesson_order": 1,
    "subject_id": 3
},
{
    "title": "الحلقات التكرارية",
    "lesson_order": 2,
    "subject_id": 3
},
{
    "title": "الدوال",
    "lesson_order": 3,
    "subject_id": 3
},
{
    "title": "مفهوم البرمجة الكائنية واساسيتها",
    "lesson_order": 1,
    "subject_id": 4
},
{
    "title": "مبدأ الوراثة",
    "lesson_order": 2,
    "subject_id": 4
},
{
    "title": "مبدأ التعامل مع الفئات المجردة",
    "lesson_order": 3,
    "subject_id": 4
},
{
    "title": "مبدأ التغليف",
    "lesson_order": 4,
    "subject_id": 4
},
{
    "title": "مقدمة عن flutter وإنشاء مشروع جديد",
    "lesson_order": 1,
    "subject_id": 5
},
{
    "title": "مفهوم الـ Widgets في Flutter",
    "lesson_order": 2,
    "subject_id": 5
}
]
```


```tsx
<Card className="sticky top-8 bg-background-light p-4 border-x-2 border-secondary rounded-lg shadow-lg">
            <CardHeader>
            <AppImage
                src={ImageSrc.courseBg1}
                alt={subject.title}
                width={1200}
                height={400}
                className="rounded-lg object-cover shadow-lg w-full h-[200px]"
              />
            </CardHeader>
            <CardContent>
              <AppLink
                href={"/classroom/subjects/1/lessons/1"}
                className="w-full mb-4 text-center bg-secondary hover:bg-secondary-hover"
              >
                <span className="text-secondary-foreground font-bold">
                  إبدء الأن
                </span>
              </AppLink>
            </CardContent>
          </Card>
```


