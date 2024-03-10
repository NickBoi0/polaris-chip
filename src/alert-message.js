import { LitElement, html, css } from 'lit';

export class AlertMessage extends LitElement {

  static get tag() {
    return 'alert-message';
  } 

  constructor() {
    super();
    this.sticky = false;
    this.opened = true;
    this.status = "notice";
    this.date = '';
    this.message = 'ALERT MESSAGE';

    const storedStatus = localStorage.getItem('alertStatus');
    if (storedStatus === 'closed') {
      this.opened = false;
      this.style.setProperty('--custom-alert-height', '25px');
    }  
  }


  static get styles() {
    return css`
      :host([sticky]) {
        position: sticky;
        top: 0;
      }

      :host([open]) .banner_wrapper {
        max-height: var(--custom-alert-height);
      }

      :host([status="notice"]) .banner_wrapper {
        background-color: var(--custom-alert-notice-bg, var(--custom-alert-bg, #a10000));
      }

      :host([status="warning"]) .banner_wrapper {
        background-color: var(--custom-alert-warning-bg, var(--custom-alert-bg, #007a2d));
      }

      :host([status="alert"]) .banner_wrapper {
        background-color: var(--custom-alert-alert-bg, var(--custom-alert-bg, #002d70));
      }

      .closed .banner_wrapper {
        height: var(--custom-alert-closed-height, var(--custom-alert-height, 25px));
      }

      .banner_wrapper {
        background: #a10000;
        padding: 20px;
        height: var(--custom-alert-height, 100px);
        border: 2px solid black;
        transition: all 0.2s ease;
      }

      .banner {
        display: flex;
      }

      .banner-heading {
        text-align: center;
        color: white;
        flex: 1;
      }
      
      .banner-opened-text {
        text-align: center;
        color: white;
      }
      
      .toggle-button {
        padding: 5px;
        border: 2px solid black;
        background: red;
        color: #fff;  
        font-size: 14px;
      }

    `;
  }

  sizeBanner() {
    this.opened = !this.opened;
  
    if (!this.opened) {
      this.style.setProperty('--custom-alert-height', '25px');
      localStorage.setItem('alertStatus', 'closed');
    } else {
      this.style.removeProperty('--custom-alert-height');
      localStorage.removeItem('alertStatus');
    }

    this.requestUpdate();
  }  

  render() {
    return html`   
      <div class="banner_wrapper">
        <div class="banner">
          <div class="banner-heading">
            <strong>AlertMessage:</strong> Weather in State College is wack
          </div>
          <button class="toggle-button" @click="${this.sizeBanner}">
            ${this.opened ? 'Close' : 'Open'} Alert
          </button>
        </div>
        <div class="banner-opened-text">
          ${this.opened ? html`
            <div class="message">${this.message}</div>
            <div class="date">${this.date}</div>
          ` : ''}
        </div>
      </div>
    `;
  }
  

  static get properties() {
    return {
      sticky: { type: Boolean, reflect: true},
      open: { type: Boolean, reflect: true },
      status: { type: String },
      date: { type: String },
      message: { type: String },
    };
  }
}

globalThis.customElements.define(AlertMessage.tag, AlertMessage);
