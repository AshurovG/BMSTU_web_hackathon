import { action, computed, makeObservable, observable, runInAction } from 'mobx';

import { Position, ServerData } from './types';

export interface ISatelliteStore {
    putPosition(): Promise<void>;
    getInfo(): Promise<void>;
}

type PrivateFields = '_position';

export default class SatelliteStore implements ISatelliteStore {
    private _position = {
        xPosition: 0,
        yPosition: 0
    }

    private _socket: WebSocket | null = null;
    private _initWebSocket() {
        this._socket = new WebSocket('ws://192.168.137.68:8080/ws');
    
        this._socket.onopen = () => {
          console.log('WebSocket соединение открыто');
        };
    
        this._socket.onmessage = (event: MessageEvent<ServerData>) => {
            console.log('Получено сообщение:', event.data);
            
            runInAction(() => {
                this._position = event.data;
                console.log('data', this._position)
            });
          };
    
        this._socket.onclose = () => {
          console.log('WebSocket соединение закрыто');
        };


      }

    public setPosition = (value: Position) => {
        this._position = value;
        this.putPosition()
    }

    constructor() {
        makeObservable<SatelliteStore, PrivateFields>(this, {
            _position: observable,
            position: computed,
            setPosition: action
        });

        this._initWebSocket();
    }

    get position(): Position {
        return this._position;
    }

    async putPosition(): Promise<void> {
        if (this._socket && this._socket.readyState === WebSocket.OPEN) {
          const payload = JSON.stringify(this._position);
          this._socket.send(payload);
        }
    }
    
    async getInfo(): Promise<void> {
    if (this._socket && this._socket.readyState === WebSocket.OPEN) {
    //   // Отправка GET-запроса через WebSocket
    //   this._socket.send('GET_INFO');
    console.log('get info')
    }
    }
}