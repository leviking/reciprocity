import { LitElement, html, css } from 'lit-element';
import '@material/mwc-select/mwc-select.js';
import '@material/mwc-list/mwc-list-item.js';
import '@material/mwc-textfield/mwc-textfield.js'

import {PolymerElement} from '@polymer/polymer';
import '@polymer/paper-dropdown-menu/paper-dropdown-menu.js';
import '@polymer/paper-item/paper-item.js';
import '@polymer/paper-input/paper-input.js';


export class ReciprocityCalc extends LitElement {
  static get properties() {
    return {
      title: { type: String },
      page: { type: String },
      time: { type: Number },
      film: { type: Number }
    };
  }

  static get styles() {
    return css`
      :host {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        font-size: calc(10px + 2vmin);
        color: var(--paper-red-700);
        max-width: 960px;
        margin: 0 auto;
        text-align: center;
        --mdc-theme-background: dark;
      }

      main {
        flex-grow: 1;
      }

      .adjustedTime {
        font-size: 2.5em;
        margin: 1em;
      }

      .app-footer {
        font-size: calc(12px + 0.5vmin);
        align-items: center;
      }

      .app-footer a {
        margin-left: 5px;
      }

      a:link {
        color: var(--paper-red-700);
      }

      a:visited {
        color: var(--paper-red-700);
        text-decoration: none;
      }

      mwc-textfield {
        --mdc-text-field-ink-color: var(--paper-red-500);
        --mdc-text-field-label-ink-color: var(--paper-red-500);
        --mdc-theme-primary: var(--paper-red-700);
        --mdc-text-field-fill-color: var(--paper-grey-900);
      }

      mwc-select {
        --mdc-theme-primary: var(--paper-red-700);
        --mdc-select-ink-color: var(--paper-red-700);
        --mdc-select-fill-color: var(--paper-grey-900);
        --mdc-select-label-ink-color: var(--paper-red-500);
        --mdc-select-idle-line-color: var(--paper-red-500);
        --mdc-select-dropdown-icon-color: var(--paper-red-500);
        --mdc-theme-text-primary-on-background: var(--paper-red-700);
        --mdc-list-vertical-padding: 0px;
      }

      mwc-list-item {
        background-color: var(--paper-grey-900);
      }
    `;
  }



  render() {
    return html`
      <main>
        <h1>Reciprocity</h1>
        <div class="adjustedTime">
          ${(this.film && this.time) && `${getAdjustedTime(this.film)(this.time)}s`}
        </div>
        <div class="adjustedTime">
          ${
            (this.film && this.time) && 
            `${getAdjustedTimeUTC(getAdjustedTime(this.film)(this.time))}`
          }
        </div>
        <mwc-textfield
          label="Seconds"
          type="number"
          @change="${(e) => this._setTime(e.target.value)}"
        >
        </mwc-textfield>
        <mwc-select
          label="Film"
          id="film"
          @change="${(e)=> this._setFilm(films[e.target.value])}"
        >
          ${
            Object.keys(films).map(
              f => html`<mwc-list-item value=${f}>${f}</mwc-list-item>`
            )
          }
        </mwc-select>

      </main>

      <p class="app-footer">
        <a target="_blank" rel="noopener noreferrer" href="https://paypal.me/lvikng56?locale.x=en_US">
        Buy me some film
        </a>
      </p>
    `;
  }

  _setFilm(film){
    this.film = film
  }

  _setTime(time){
    this.time = time
  }
}

const getAdjustedTime = (film) => (time) => {
  return Math.round(Math.pow(time, film))
}

const getAdjustedTimeUTC = (time) => {
  return new Date(time * 1000).toISOString().substr(11, 8)
}

const films = {
  "Arista100" : 1.52,
  "Arista200" : 1.55,
  "Arista400" : 1.35,
  "Bergger" : 1.17,
  "Delta100" : 1.26,
  "Delta3200" : 1.33,
  "Delta400" : 1.41,
  "Ektar" : 1.18,
  "Foma100" : 1.52,
  "Foma200" : 1.55,
  "Foma400" : 1.35,
  "FP4" : 1.26,
  "Gold200" : 1.2,
  "HP5" : 1.31,
  "Kentmere100" : 1.26,
  "Kentmere400" : 1.3,
  "Neopan" : 1.05,
  "PanF" : 1.33,
  "Portra" : 1.36,
  "Provia" : 1.04,
  "Retro320" : 1.35,
  "RPX25" : 1.3,
  "SFX200" : 1.43,
  "TMax100" : 1.16,
  "TriS" : 1.21,
  "Velvia100" : 1.08,
  "Velvia50" : 1.21,
  "Vision" : 1.2,
  "XP2" : 1.31
}

