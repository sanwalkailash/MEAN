import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import {environment} from '../../environments/environment';
import { UtilService } from './util.service';
import {BroadcastService} from './broatcast.service';
@Injectable()
export class AppConfigLoaderService {
    private httpClient;
    constructor(private util:UtilService,public broadcaster:BroadcastService) {
    }
    getAppConfig(): Promise<any> {
        const promise = this.util.getHttpClient().get(environment.CONFIG_API)
            .toPromise()
            .then(settings => {
                // console.log(`Settings from API: `, settings);
                var config = settings['config'];
                var vocab = settings['vocab'];
                environment.APP_CONFIG=config;
                environment.APP_VOCAB=vocab;
                console.log('app-configration', config);
                // this.util.setAuthAppConfigInStorage(config);
                console.log('app-vocab', vocab);
                // this.util.setAuthAppVocabInStorage(vocab)
                this.broadcaster.sendMessage(environment.BROADCAST_CHANGE_LANGUAGE,"change portal language")
                return settings;
            });

        return promise;


    }

}