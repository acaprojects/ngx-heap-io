import { Component, ViewContainerRef, ViewEncapsulation, OnInit } from '@angular/core';

import { AppService } from './services/app.service';

import * as day_api from 'dayjs';
import { HeapIoService } from '../../lib/src/services/heap-io.service';
const dayjs = day_api;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {

    constructor(private service: AppService, private heap_io: HeapIoService) { }

    public ngOnInit(): void {
        this.heap_io.load({ app_id: 3540602199, force_ssl: true, secure_cookie: true, disable_text_capture: true, cookie_path: '/' });
    }

}
