import { LitElement, html, css } from 'lit';

export class AlertMessage extends LitElement {

  static get tag() {
    return 'alert-message';
  } 

  constructor() {
    super();
    this.sticky = false;
  }

  static get styles() {
    return css`

      :host {
        margin: 0;
      }
      :host([sticky]) .banner_wrapper {
        position: fixed;
      }

      .banner_wrapper {
        background: #a10000;
        padding: 20px;
        top: 0;
        width: 100%;
        border: 2px solid black;
      }

      .banner {
        max-width: 500px;
        margin: 0 auto;
        display: flex;
        align-items: center;
      }

      .banner__text {
        flex-grow: 1;
        line-height: 1.4;
        font-family: "Quicksand", sans-serif;
        text-align: center;
      }
      
      

    `;
  }

  render() {
    return html`   
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
      <div class="banner_wrapper">
        <div class="banner">
          <div class="banner__text">
            <strong>AlertMessage:</strong> Weather in State College is wack
          </div>
          <span class="material-symbols-outlined">expand_more</span>
        </div>
      </div>
    `;
  }

  static get properties() {
    return {
      sticky: { type: Boolean, reflect: true},
    };
  }
}

globalThis.customElements.define(AlertMessage.tag, AlertMessage);
