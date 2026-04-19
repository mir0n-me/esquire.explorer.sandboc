/*
*  Esquire frameworks (tm)
*  Esquire Explorer sandbox
*  Copyright(c) 2001, 2025 mir0n&co www.mir0n.me
*  mailto:mir0n.the.programmer@gmail.com
*
*  History:
* 12/24/2025 mir0n kind parameter is requried for esq-cmd, esq-enode
* 12/24/2025 mir0n use esquire.ui library
* 04/18/2026 mir0n  EsqObjectKind API; EsqExplorerHostDummy; loading/error signals; esquireKinds
*/
import {Component
  , OnInit
  , OnDestroy
  , inject
  , signal
  , ViewEncapsulation
} from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialog} from '@angular/material/dialog';
import { Observable, catchError, throwError, finalize, of } from 'rxjs';
import {EsqObjectKind
  , EsqObjectKindFactory
  , EsqRestApi
  , EsqDictionaryApi
  , EsqExplorerCallApi
  , EsqExplorerHost
  , EsqExplorerHostDummy
  , EsqNodeStatus
  , EsqNodeStatusFactory
} from '@mir0n-pro/esquire.ui/api';
import {EsqDictionary, EsqExplorerCallApiMill} from '@mir0n-pro/esquire.ui/components';
import {EsqUtils} from '@mir0n-pro/esquire.ui/api';
import {EsqExplorerComponent} from '@mir0n-pro/esquire.ui/explorer/flatTree';

import {EsquireService} from '../../rest/api/esquire.service';

@Component({
  selector: 'app-pokemon-tree',
  standalone: true,
  imports: [
    MatToolbarModule,
    EsqExplorerComponent
  ],
  templateUrl: './pokemon-tree.component.html',
  styleUrls: ['./pokemon-tree.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PokemonTreeComponent extends EsqExplorerHostDummy implements OnInit, OnDestroy {
  dataService: EsquireService;
  readonly detailsDialog: MatDialog = inject(MatDialog);
  private callApi: EsqExplorerCallApi;
  private callHost: EsqExplorerHost;
  private dictionary: EsqDictionaryApi;
  errorMessage = signal('');
  statusMessage = signal('Ready');
  ready = signal(false);

  /** Wraps an Observable with loading state, error capture, and optional delay. */
  private pipeWithErrorAndDelay(obsrvbl: Observable<any>): Observable<any> {
    this.errorMessage.set('');
    this.callHost?.setLoading(true);
    return EsqUtils.observeWithDelay(obsrvbl, 1000).pipe(
      catchError(err => {
        this.setErrorMessage(err.detail || err.title || String(err), err);
        return throwError(() => err);
      }),
      finalize(() => this.callHost?.setLoading(false))
    );
  }

  /** Displays an error message in the footer; truncates to 64 chars. */
  override setErrorMessage(msg: string, err?: any): void {
    this.errorMessage.set(msg.length > 64 ? msg.substring(0, 61) + '...' : msg);
    if (err) {
      EsqUtils.log('Error: ' + JSON.stringify(err));
    }
  }

  /** Updates the footer status text: "Loading..." while active, "Ready" on completion. */
  override setLoading(on: boolean): void {
    if (on) {
      this.statusMessage.set('Loading...');
    } else if (this.errorMessage().length === 0) {
      this.statusMessage.set('Ready');
    }
  }

  constructor(dataService: EsquireService) {
    super();
    EsqUtils.DEBUG = false;
    EsqUtils.DELAY = false;
    this.dataService = dataService;
    this.dictionary = new EsqDictionary(this.esqRestApiWrapper());
    var callApiMill = new EsqExplorerCallApiMill(this.detailsDialog, this.dictionary, this.esqRestApiWrapper());
    this.callApi = callApiMill.instance();
    this.callApi.registerHost(this);
    this.callHost = callApiMill.getHost();
  }

  /** Builds the REST API adapter; live methods delegate to EsquireService, write stubs return empty. */
  public esqRestApiWrapper(): EsqRestApi {
    return {
      esquire: (id?: string, skip?: number, take?: number, options?: any) => {
        return this.pipeWithErrorAndDelay(
          this.dataService.esquire(id ? encodeURIComponent(id) : undefined, skip, take, 'body', false, options)
        );
      },
      esquirePath: (id: string, options?: any) => {
        return this.pipeWithErrorAndDelay(
          this.dataService.esquirePath(encodeURIComponent(id), options)
        );
      },
      esquireCmd: (kind: number, id: string, cmd?: string, options?: any) => {
        return this.pipeWithErrorAndDelay(
          this.dataService.esquireCmd(kind, encodeURIComponent(id), cmd, options)
        );
      },
      esquireEntityNode: (kind: number, id?: string, name?: string, options?: any) => {
        return this.pipeWithErrorAndDelay(
          this.dataService.esquireEntityNode(kind, (id && id.length > 0) ? encodeURIComponent(id) : undefined,
            name ? encodeURIComponent(name) : undefined, options)
        );
      },
      esquireDictionary: (kind: number, options?: any) => {
        return this.pipeWithErrorAndDelay(
          this.dataService.esquireDictionary(kind, options)
        );
      },
      esquireKey:     (_id?: string, _options?: any) => of({}),
      esquireKinds:   () => this.pipeWithErrorAndDelay(this.dataService.esquireKinds()),
      esquireCmdSave: (_kind: number, _id: string, _body: any, _cmd?: string, _options?: any) => of({}),
      esquireKeySave: (_id: string, _body: any, _options?: any) => of({}),
      esquireCmdNew:  (_kind: number, _parentId: string, _body: any, _cmd?: string, _options?: any) => of({}),
      esquireCmdDel:  (_kind: number, _id: string, _cmd?: string, _options?: any) => of({}),
      esquireCmdMove: (_kind: number, _id: string, _distId: string, _options?: any) => of({}),
    };
  };

  /** Returns the explorer call API instance for the template binding. */
  public esqExplorerCallApiWrapper(): EsqExplorerCallApi {
    return this.callApi;
  }

  /** Unregisters this host from the call API mill to prevent memory leaks. */
  ngOnDestroy(): void {
    this.callApi.unregisterHost(this);
  }

  /** Initialises statuses and kind registry from the server, then signals the template to render the explorer. */
  async ngOnInit() {
    EsqNodeStatusFactory.init(Object.values(PokemonStatuses));
    await EsqObjectKindFactory.init(this.esqRestApiWrapper(), Object.values(PokemonNodeTypes));
    this.ready.set(true);
  }

}

/** Local UI overrides for server-defined kinds: icon and list column headers only.
 *  Structural properties (treeFlags, childKinds, detailed) are owned by the server and merged at init. */
export const PokemonNodeTypes = {
    Pokemons:    new EsqObjectKind({id:  2, name:"Pokemons", icon:"img/folders/folder-pocs.ico",    listHeaders:[{columnDef:"name", header:"Pokémon"},         {columnDef:"desc", header:"Description"}]}),
    Games:       new EsqObjectKind({id:  4, name:"Games",    icon:"img/folders/folder-games.ico",   listHeaders:[{columnDef:"name", header:"Game"},            {columnDef:"desc", header:"Description"}]}),
    TvShows:     new EsqObjectKind({id:  6, name:"TvShows",  icon:"img/folders/folder-shows.ico",   listHeaders:[{columnDef:"name", header:"TV Show"},         {columnDef:"desc", header:"Description"}]}),
    Books:       new EsqObjectKind({id:  8, name:"Books",    icon:"img/folders/folder-books.ico",   listHeaders:[{columnDef:"name", header:"Book"},            {columnDef:"desc", header:"Description"}]}),
    Posters:     new EsqObjectKind({id: 10, name:"Posters",  icon:"img/folders/folder-posters.ico", listHeaders:[{columnDef:"name", header:"Poster"},          {columnDef:"desc", header:"Description"}]}),
    Pokemon:     new EsqObjectKind({id: 12, name:"Pokemon",  icon:"img/pokemon.ico",                listHeaders:[{columnDef:"name", header:"Pokémon details"}, {columnDef:"desc", header:"Description"}]}),
    PokemonLink: new EsqObjectKind({id: 13, name:"Pokemon",  icon:"img/links/pokemon-link.ico"}),
    Game:        new EsqObjectKind({id: 14, name:"Game",     icon:"img/game.ico",                   listHeaders:[{columnDef:"name", header:"Pokémon"},         {columnDef:"desc", header:"Description"}]}),
    GameLink:    new EsqObjectKind({id: 15, name:"Game",     icon:"img/links/game-link.ico"}),
    TvShow:      new EsqObjectKind({id: 16, name:"TvShow",   icon:"img/tv-show.ico",                listHeaders:[{columnDef:"name", header:"Pokémon"},         {columnDef:"desc", header:"Description"}]}),
    TvShowLink:  new EsqObjectKind({id: 17, name:"TvShow",   icon:"img/links/tv-show-link.ico"}),
    Book:        new EsqObjectKind({id: 18, name:"Book",     icon:"img/book.ico",                   listHeaders:[{columnDef:"name", header:"Pokémon"},         {columnDef:"desc", header:"Description"}]}),
    BookLink:    new EsqObjectKind({id: 19, name:"Book",     icon:"img/links/book-link.ico"}),
    Poster:      new EsqObjectKind({id: 20, name:"Poster",   icon:"img/poster.ico",                 listHeaders:[{columnDef:"name", header:"Pokémon"},         {columnDef:"desc", header:"Description"}]}),
    PosterLink:  new EsqObjectKind({id: 21, name:"Poster",   icon:"img/links/poster-link.ico"}),
    Power:       new EsqObjectKind({id: 22, name:"Power",    icon:"img/power.ico"}),
} as const;

/** Node status badges shown as overlay icons on tree nodes. */
export const PokemonStatuses = {
    Empty:   new EsqNodeStatus(0,  "Empty",    "img/status/empty.ico"),
    Deleted: new EsqNodeStatus(1,  "Deleted",  "img/status/delete.ico"),
    Locked:  new EsqNodeStatus(2,  "Locked",   "img/status/warning.ico"),
    Good:    new EsqNodeStatus(3,  "Checked",  "img/status/ok.ico"),
    Question:new EsqNodeStatus(4,  "Question", "img/status/question.ico"),
} as const;
