from core.models import User

users = User.objects.all()
with open('users_output.txt', 'w') as f:
    f.write(f'Total users: {users.count()}\n')
    for u in users:
        f.write(f'  {u.username} | {u.email} | active={u.is_active}\n')