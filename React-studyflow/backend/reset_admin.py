import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from core.models import User

# Reset admin password
try:
    u = User.objects.get(username='admin')
    u.set_password('admin123')
    u.save()
    print('Password reset for admin to: admin123')
except User.DoesNotExist:
    print('Admin user not found')

# List all users
users = User.objects.all()
print(f'\nTotal users: {User.objects.count()}')
for u in User.objects.all():
    print(f'  {u.username} | {u.email} | active={u.is_active}')