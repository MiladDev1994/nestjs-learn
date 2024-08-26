import { Controller, Get, Res, StreamableFile } from '@nestjs/common';
import { createReadStream } from 'fs';
import { join } from 'path';

@Controller('file')
export class FileController {

    @Get("stream_file")
    getFile(): StreamableFile {
        const file = createReadStream(join(process.cwd(), "package.json"));
        return new StreamableFile(file)
    }

    @Get("stream_file_customize")
    getFileCustomizeResponse(
        @Res({
            passthrough: true,
        })
        res
    ): StreamableFile {
        const file = createReadStream(join(process.cwd(), "package.json"));
        res.set({
            "Content-Type": "application/json",
            "Content-Disposition": "attachment; filename=package.json"
        })
        return new StreamableFile(file)
    }
}
