# TODO

- добавить токены, загрузку и чтение файлов в папки пользователей по токену
- добавить генератор pdf

# Раздача статики

В NestJS (и в Express, который лежит в его основе) middleware для раздачи статики (`app.useStaticAssets`) не поддерживает "на лету" авторизационные проверки — он просто раздает файлы всем, кто обратился по адресу.

### Как сделать раздачу статики только с JWT?

Вам нужно отказаться от использования `useStaticAssets` для защищаемых директорий и реализовать свой **контроллер**, который будет:
1. Проверять авторизацию (например, с помощью `@UseGuards(JwtAuthGuard)`).
2. После проверки отдавать файл вручную через `res.sendFile()`.

---

## Пример реализации

### 1. **Создайте контроллер для файлов**

```typescript
// file.controller.ts
import { Controller, Get, Param, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { JwtAuthGuard } from 'path-to-your-auth/jwt-auth.guard'; // путь к вашему JwtAuthGuard
import { join } from 'path';
import * as fs from 'fs';

@Controller('protected-files')
export class FileController {
  @UseGuards(JwtAuthGuard)
  @Get(':filename')
  async getFile(
    @Param('filename') filename: string,
    @Res() res: Response,
  ) {
    // Проверьте, что filename не содержит ../
    if (filename.includes('..')) {
      return res.status(400).send('Invalid filename');
    }

    const filePath = join(process.env.UPLOADS_PATH, filename);

    if (!fs.existsSync(filePath)) {
      return res.status(404).send('File not found');
    }

    res.sendFile(filePath, (err) => {
      if (err) {
        res.status(500).send('Could not send file');
      }
    });
  }
}
```

---

### 2. **Добавьте контроллер в модуль**

```typescript
@Module({
  controllers: [FileController],
  // ...
})
export class AppModule {}
```

---

### 3. **Удалите (или не добавляйте) useStaticAssets для этой папки**

Если вы хотите часть статики раздавать открыто, используйте `useStaticAssets` только для публичных директорий, а защищаемые — только через ваш контроллер.

---

## Теперь:

- Доступ к `http://yourdomain/protected-files/filename.jpg` будет только у авторизованных по JWT пользователей.
- Все остальные (или по прямому пути через static assets) — не смогут получить доступ.

---

## Советы

- Не забудьте реализовать защиту от path traversal (`../`)
- Можно расширить контроллер, чтобы поддерживать поддиректории (например, `:folder/:filename`...)
- Если файлов много и крупные — можно рассмотреть стриминг файлов (`createReadStream` + `res`)

---

**Если нужно реализовать доступ к файлам в подпапках или с другими условиями — уточните, и я помогу с примером!**