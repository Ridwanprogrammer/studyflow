import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings.development')
django.setup()

from core.models import User

# Reset admin2 password
try:
    u = User.objects.get(username='admin2')
    u.set_password('admin123')
    u.save()
    print('Password reset for admin2 to: admin123')
except User.DoesNotExist:
    print('Admin2 user not found')

# List all users
print(f'\nTotal users: {User.objects.count()}')
for u in User.objects.all():
    print(f'  {u.username} | {u.email} | active={u.is_active}')