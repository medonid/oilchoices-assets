/* ══════════════════════════════════════════════
   OILCHOICES.COM — Complete CSS v7.1 STABLE
   GitHub: medonid/oilchoices-assets
══════════════════════════════════════════════ */

/* ── Base Reset ── */
html {
  margin: 0 !important;
  padding: 0 !important;
  box-sizing: border-box;
}
body {
  margin: 0 !important;
  width: 100% !important;
  box-sizing: border-box;
  padding-left: 0 !important;
  padding-right: 0 !important;
}
img, video {
  height: auto;
  display: block;
}

/* ══════════════════════════════════════════════
   CSS VARIABLES
══════════════════════════════════════════════ */
:root {
  --oc-nb-h: 0px;
  --oc-red:   #BF0A30;
  --oc-red2:  #e8143a;
  --oc-navy:  #0A1628;
  --oc-navy2: #0d1f3c;
}

/* ══════════════════════════════════════════════
   NOTICE BAR
══════════════════════════════════════════════ */
#oc-nb {
  position: sticky;
  top: 0;
  z-index: 9999;
  width: 100% !important;
  max-width: 100% !important;
  margin: 0 !important;
  padding: 9px 18px !important;
  background: linear-gradient(90deg, #002868, #0d1f3c 60%, #002868);
  color: #fff;
  text-align: center;
  font-size: 13.5px;
  font-weight: 700;
  border-bottom: 2px solid #BF0A30;
  box-shadow: 0 2px 10px rgba(0,0,0,.20);
  transition: padding .3s, font-size .3s;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1.4;
  box-sizing: border-box;
}
#oc-nb.compact {
  padding: 6px 18px !important;
  font-size: 12px;
}
#oc-nb a {
  color: #ffaabb;
  text-decoration: underline;
  text-underline-offset: 2px;
}

/* ══════════════════════════════════════════════
   SCROLL PROGRESS BAR
══════════════════════════════════════════════ */
#oc-prog {
  position: fixed !important;
  top: 0 !important;
  left: 0 !important;
  width: 0% !important;
  height: 3px !important;
  margin: 0 !important;
  padding: 0 !important;
  background: linear-gradient(90deg, #002868 0%, #BF0A30 45%, #fff 75%, #BF0A30 100%);
  z-index: 999999 !important;
  pointer-events: none !important;
  display: block !important;
  visibility: visible !important;
  opacity: 1 !important;
  overflow: visible !important;
  transform: none !important;
  transition: width .1s linear;
}

/* ══════════════════════════════════════════════
   MAIN HEADER SHELL
══════════════════════════════════════════════ */
#oc-hdr {
  position: sticky;
  top: var(--oc-nb-h);
  z-index: 9998;
  width: 100% !important;
  max-width: 100% !important;
  margin: 0 !important;
  padding: 0 !important;
  overflow: visible !important;
  background: linear-gradient(135deg,
    rgba(10,22,40,.99),
    rgba(13,31,60,.98) 55%,
    rgba(20,42,78,.97));
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(191,10,48,.22);
  box-shadow: 0 8px 32px rgba(0,0,0,.28);
  transition: box-shadow .3s;
  box-sizing: border-box;
}
#oc-hdr::after {
  content: '';
  position: absolute;
  left: 0; bottom: 0;
  width: 100%; height: 2px;
  background: linear-gradient(90deg,
    #002868 0%,  #002868 33%,
    #BF0A30 33%, #BF0A30 66%,
    #002868 66%, #002868 100%);
}
#oc-hdr.scrolled { box-shadow: 0 12px 42px rgba(0,0,0,.36); }

/* ── Row 1 ── */
.oc-r1 {
  max-width: 1380px !important;
  width: 100% !important;
  margin: 0 auto !important;
  padding: 12px 24px !important;
  display: flex;
  align-items: center;
  gap: 14px;
  flex-wrap: wrap;
  transition: padding .3s;
  box-sizing: border-box;
}
#oc-hdr.scrolled .oc-r1 {
  padding-top: 8px !important;
  padding-bottom: 8px !important;
}

/* ── Brand ── */
.oc-brand {
  display: flex;
  align-items: center;
  gap: 13px;
  text-decoration: none;
  min-width: max-content;
  width: auto !important;
  max-width: none !important;
  margin: 0 !important;
}

/* ── Logo Badge ── */
.oc-badge {
  position: relative;
  overflow: hidden;
  background: linear-gradient(160deg, #fff 0%, #f4f7ff 55%, #fff4f6 100%);
  border-radius: 16px;
  padding: 8px 12px;
  border-top: 3px solid #002868;
  border-bottom: 2px solid #BF0A30;
  border-left: 1px solid rgba(0,40,104,.18);
  border-right: 1px solid rgba(191,10,48,.18);
  box-shadow: 0 14px 30px rgba(10,22,40,.28), inset 0 1px 0 rgba(255,255,255,.95);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: padding .3s;
  width: auto !important;
  max-width: none !important;
  margin: 0 !important;
}
.oc-badge::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 45%;
  background: linear-gradient(180deg, rgba(255,255,255,.55), transparent);
  border-radius: 14px 14px 0 0;
  pointer-events: none;
}
.oc-badge img {
  height: 54px !important;
  width: auto !important;
  display: block;
  position: relative;
  z-index: 1;
  filter: drop-shadow(0 2px 5px rgba(0,0,0,.12));
  transition: height .3s;
}
#oc-hdr.scrolled .oc-badge     { padding: 6px 10px; }
#oc-hdr.scrolled .oc-badge img { height: 44px !important; }

/* ── Brand Text ── */
.oc-btext {
  display: flex;
  flex-direction: column;
  line-height: 1.05;
  width: auto !important;
  max-width: none !important;
  margin: 0 !important;
}
.oc-btitle {
  color: #fff;
  font-size: 26px;
  font-weight: 900;
  letter-spacing: .2px;
  transition: font-size .3s;
  width: auto !important;
  max-width: none !important;
  margin: 0 !important;
}
#oc-hdr.scrolled .oc-btitle { font-size: 22px; }
.oc-bsub {
  color: rgba(255,154,170,.92);
  font-size: 11.5px;
  font-weight: 800;
  letter-spacing: 1.1px;
  text-transform: uppercase;
  margin-top: 2px !important;
  width: auto !important;
  max-width: none !important;
}

/* ── Mobile Toggle ── */
.oc-tog {
  display: none;
  margin-left: auto !important;
  width: 46px !important;
  max-width: 46px !important;
  height: 46px;
  border: 1px solid rgba(191,10,48,.35);
  background: rgba(255,255,255,.05);
  color: #ffaabb;
  border-radius: 13px;
  cursor: pointer;
  font-size: 20px;
  align-items: center;
  justify-content: center;
}

/* ── Nav Wrap ── */
.oc-nwrap {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1 !important;
  justify-content: flex-end;
  flex-wrap: wrap;
  width: auto !important;
  max-width: none !important;
  margin: 0 !important;
}

/* ── Nav ── */
.oc-nav {
  display: flex;
  align-items: center;
  gap: 2px;
  flex-wrap: wrap;
  width: auto !important;
  max-width: none !important;
  margin: 0 !important;
}

/* ── Nav Links & Dropdown Toggles ── */
.oc-lnk, .oc-dtog {
  color: #fff;
  text-decoration: none;
  font-weight: 800;
  font-size: 12px;
  letter-spacing: .55px;
  padding: 9px 11px;
  border-radius: 999px;
  background: transparent;
  border: 1px solid transparent;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  white-space: nowrap;
  width: auto !important;
  max-width: none !important;
  margin: 0 !important;
  transition: background .22s, color .22s, transform .18s, border-color .22s;
}
.oc-lnk:hover, .oc-dtog:hover {
  background: rgba(191,10,48,.14);
  border-color: rgba(191,10,48,.28);
  color: #ffaabb;
  transform: translateY(-1px);
}
.oc-lnk.active, .oc-dtog.active {
  background: linear-gradient(180deg, rgba(191,10,48,.18), rgba(191,10,48,.08));
  border-color: rgba(191,10,48,.28);
  color: #ffaabb;
}
/* ── Dropdown ── */
.oc-dd {
  position: relative !important;
  width: auto !important;
  max-width: none !important;
  margin: 0 !important;
}
.oc-ddm {
  position: absolute !important;
  top: calc(100% + 10px);
  left: 50%;
  transform: translateX(-50%);
  width: 242px !important;
  min-width: 242px !important;
  max-width: 320px !important;
  margin: 0 !important;
  background: linear-gradient(180deg, #fff, #f4f7ff);
  border: 1px solid rgba(0,40,104,.12);
  border-top: 3px solid #BF0A30;
  border-radius: 18px;
  padding: 14px;
  box-shadow: 0 20px 50px rgba(10,22,40,.22);
  display: none;
  z-index: 100010;
  animation: ocIn .18s ease;
}
@keyframes ocIn {
  from { opacity: 0; transform: translateX(-50%) translateY(-6px); }
  to   { opacity: 1; transform: translateX(-50%) translateY(0); }
}
.oc-dd.open .oc-ddm { display: block; }

.oc-ddt {
  font-size: 11px;
  font-weight: 900;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: #002868;
  border-bottom: 1px solid rgba(191,10,48,.18);
  padding-bottom: 8px;
  margin: 0 0 9px 0 !important;
  width: auto !important;
  max-width: none !important;
}
.oc-ddl {
  display: flex;
  flex-direction: column;
  gap: 2px;
  width: auto !important;
  max-width: none !important;
  margin: 0 !important;
}
.oc-ddl a {
  color: #0d1f3c;
  text-decoration: none;
  font-weight: 700;
  font-size: 13px;
  padding: 9px 12px;
  border-radius: 11px;
  display: flex;
  align-items: center;
  gap: 8px;
  width: auto !important;
  max-width: none !important;
  margin: 0 !important;
  transition: background .18s, color .18s, padding-left .18s;
}
.oc-ddl a::before {
  content: '';
  width: 4px !important;
  height: 4px;
  border-radius: 50%;
  background: #BF0A30;
  flex-shrink: 0;
}
.oc-ddl a:hover {
  background: rgba(191,10,48,.10);
  color: #BF0A30;
  padding-left: 16px;
}

/* ── Search ── */
.oc-srch {
  position: relative !important;
  width: 230px !important;
  max-width: 230px !important;
  min-width: 160px !important;
  margin: 0 !important;
}
.oc-srch input {
  width: 100% !important;
  max-width: 100% !important;
  height: 46px;
  border: 1px solid rgba(191,10,48,.25);
  outline: 0;
  border-radius: 999px;
  padding: 0 48px 0 17px;
  font-size: 13px;
  background: rgba(255,255,255,.97);
  color: #0d1f3c;
  box-shadow: 0 6px 16px rgba(10,22,40,.14);
  transition: border-color .22s, box-shadow .22s;
  margin: 0 !important;
  box-sizing: border-box;
}
.oc-srch input:focus {
  border-color: rgba(191,10,48,.55);
  box-shadow: 0 6px 16px rgba(10,22,40,.14), 0 0 0 3px rgba(191,10,48,.14);
}
.oc-srch input::placeholder { color: #6a7a9b; font-weight: 600; }
.oc-srch button {
  position: absolute !important;
  right: 5px;
  top: 50%;
  transform: translateY(-50%);
  width: 36px !important;
  max-width: 36px !important;
  height: 36px;
  border-radius: 50%;
  border: 0;
  cursor: pointer;
  font-size: 15px;
  color: #fff;
  background: linear-gradient(135deg, #BF0A30, #e8143a);
  box-shadow: 0 4px 12px rgba(191,10,48,.40);
  transition: transform .18s;
  margin: 0 !important;
}
.oc-srch button:hover { transform: translateY(-50%) scale(1.09); }

/* ── CTA Button ── */
.oc-cta {
  text-decoration: none;
  color: #fff;
  font-weight: 900;
  font-size: 12px;
  letter-spacing: .7px;
  padding: 12px 18px;
  border-radius: 999px;
  white-space: nowrap;
  background: linear-gradient(135deg, #BF0A30, #e8143a);
  box-shadow: 0 8px 20px rgba(191,10,48,.40);
  border: 1px solid rgba(255,255,255,.18);
  transition: transform .22s, box-shadow .22s;
  width: auto !important;
  max-width: none !important;
  margin: 0 !important;
}
.oc-cta:hover {
  transform: translateY(-2px);
  box-shadow: 0 13px 28px rgba(191,10,48,.50);
}

/* ══════════════════════════════════════════════
   YMM ROW
══════════════════════════════════════════════ */
.oc-ymm {
  width: 100% !important;
  max-width: 100% !important;
  margin: 0 !important;
  background: linear-gradient(90deg,
    rgba(0,40,104,.22) 0%,
    rgba(191,10,48,.12) 50%,
    rgba(0,40,104,.18) 100%);
  border-top: 1px solid rgba(191,10,48,.18);
  padding: 9px 24px !important;
  transition: padding .3s;
  box-sizing: border-box;
}
#oc-hdr.scrolled .oc-ymm {
  padding-top: 6px !important;
  padding-bottom: 6px !important;
}
.oc-ymm-in {
  max-width: 1380px !important;
  width: 100% !important;
  margin: 0 auto !important;
  display: flex;
  align-items: center;
  gap: 9px;
  flex-wrap: wrap;
}
.oc-ymm-lbl {
  color: rgba(255,170,187,.95);
  font-weight: 900;
  font-size: 12px;
  letter-spacing: .6px;
  white-space: nowrap;
  width: auto !important;
  max-width: none !important;
  margin: 0 !important;
}
.oc-ymm-in select {
  height: 38px;
  border-radius: 9px;
  border: 1px solid rgba(191,10,48,.32);
  background: rgba(255,255,255,.97);
  color: #0d1f3c;
  font-size: 13px;
  font-weight: 700;
  padding: 0 10px;
  cursor: pointer;
  flex: 1;
  min-width: 80px;
  max-width: 158px !important;
  margin: 0 !important;
  transition: border-color .2s, box-shadow .2s;
}
.oc-ymm-in select:focus {
  outline: 0;
  border-color: #BF0A30;
  box-shadow: 0 0 0 3px rgba(191,10,48,.16);
}
.oc-ymm-btn {
  height: 38px;
  padding: 0 18px;
  border-radius: 9px;
  border: none;
  background: linear-gradient(135deg, #BF0A30, #e8143a);
  color: #fff;
  font-weight: 900;
  font-size: 12px;
  cursor: pointer;
  white-space: nowrap;
  box-shadow: 0 5px 14px rgba(191,10,48,.40);
  transition: transform .18s, box-shadow .18s;
  width: auto !important;
  max-width: none !important;
  margin: 0 !important;
}
.oc-ymm-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 8px 20px rgba(191,10,48,.55);
}

/* ══════════════════════════════════════════════
   SPEC RESULT PANEL
══════════════════════════════════════════════ */
#oc-spec-panel {
  width: 100% !important;
  max-width: 100% !important;
  margin: 0 !important;
  padding: 10px 24px !important;
  box-sizing: border-box;
  background: linear-gradient(90deg,
    rgba(0,40,104,.22),
    rgba(191,10,48,.10),
    rgba(0,40,104,.18));
  border-top: 1px solid rgba(191,10,48,.28);
  animation: ocPanelIn .22s ease;
}
@keyframes ocPanelIn {
  from { opacity: 0; transform: translateY(-4px); }
  to   { opacity: 1; transform: translateY(0); }
}
#oc-spec-panel > div {
  max-width: 1380px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  padding: 4px 0;
}
.oc-sp-veh {
  color: #ffaabb;
  font-size: 12px;
  font-weight: 900;
  white-space: nowrap;
  letter-spacing: .4px;
  margin-right: 4px;
}
.oc-sp-pill {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  background: rgba(255,255,255,.96);
  border-radius: 7px;
  padding: 5px 11px;
  white-space: nowrap;
  margin: 2px 0;
  box-shadow: 0 2px 8px rgba(0,0,0,.08);
}
.oc-sp-pill-lbl {
  font-size: 9.5px;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: .6px;
}
.oc-sp-pill-val {
  font-size: 13px;
  font-weight: 800;
  color: #0A1628;
}
.oc-sp-link {
  color: #ffaabb;
  font-size: 11.5px;
  font-weight: 800;
  text-decoration: underline;
  white-space: nowrap;
  margin-left: auto;
  letter-spacing: .3px;
}
.oc-sp-link:hover { color: #fff; }
.oc-sp-close {
  background: none;
  border: none;
  color: rgba(255,170,187,.6);
  cursor: pointer;
  font-size: 17px;
  padding: 0 4px;
  line-height: 1;
  transition: color .18s;
}
.oc-sp-close:hover { color: #ffaabb; }
#oc-spec-panel.oc-sp-err {
  background: linear-gradient(90deg,
    rgba(191,10,48,.18),
    rgba(191,10,48,.08),
    rgba(191,10,48,.14));
}
#oc-spec-panel.oc-sp-err span {
  color: #ffaabb;
  font-size: 13px;
  font-weight: 700;
}

/* ══════════════════════════════════════════════
   BACK TO TOP
══════════════════════════════════════════════ */
#oc-btt {
  position: fixed !important;
  bottom: 20px !important;
  right: 20px !important;
  width: 48px !important;
  max-width: 48px !important;
  height: 48px !important;
  border: 1px solid rgba(191,10,48,.30);
  border-radius: 50%;
  background: linear-gradient(135deg, #0A1628, #0d1f3c);
  color: #ffaabb;
  cursor: pointer;
  display: flex !important;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 22px rgba(0,0,0,.24);
  opacity: 0;
  visibility: hidden;
  transform: translateY(12px) scale(.95);
  transition: opacity .26s, transform .26s, visibility .26s, background .22s;
  z-index: 999998 !important;
  margin: 0 !important;
  padding: 0 !important;
  overflow: visible !important;
}
#oc-btt.show {
  opacity: 1 !important;
  visibility: visible !important;
  transform: translateY(0) scale(1) !important;
}
#oc-btt:hover { background: linear-gradient(135deg, #BF0A30, #0d1f3c); }
#oc-btt svg {
  width: 20px !important;
  height: 20px !important;
  fill: none;
  stroke: currentColor;
  stroke-width: 2.6;
  stroke-linecap: round;
  stroke-linejoin: round;
}

/* ══════════════════════════════════════════════
   HIDE NATIVE HEADERS
══════════════════════════════════════════════ */
.oc-kill {
  display: none !important;
  visibility: hidden !important;
  opacity: 0 !important;
  height: 0 !important;
  min-height: 0 !important;
  max-height: 0 !important;
  overflow: hidden !important;
  pointer-events: none !important;
  margin: 0 !important;
  padding: 0 !important;
  border: 0 !important;
}

/* ══════════════════════════════════════════════
   HOSTINGER FULL WIDTH FIX
══════════════════════════════════════════════ */
.block-layout,
.block-layout--layout,
[class*="grid-container"],
[class*="zyro-"],
[class*="builder-block"],
[class*="section__"],
[class*="is-section"],
.main-layout,
.layout-wrapper,
.page-wrapper,
.site-wrapper {
  max-width: 100vw !important;
  width: 100% !important;
  padding-left: 0 !important;
  padding-right: 0 !important;
  margin-left: 0 !important;
  margin-right: 0 !important;
  box-sizing: border-box !important;
}
section img,
section video,
.block-layout img,
.block-layout video {
  width: 100% !important;
  max-width: 100% !important;
  height: auto;
  display: block;
}

/* ══════════════════════════════════════════════
   RESPONSIVE
══════════════════════════════════════════════ */
@media (max-width: 1100px) {
  .oc-srch { width: 185px !important; max-width: 185px !important; }
  .oc-lnk, .oc-dtog { font-size: 11px; padding: 8px 9px; }
}

@media (max-width: 960px) {
  .oc-tog { display: inline-flex !important; }
  .oc-r1 {
    flex-wrap: nowrap;
    padding: 12px 14px !important;
    justify-content: space-between;
  }
  .oc-r1 .oc-nwrap { display: none !important; }
  .oc-nwrap.open {
    display: flex !important;
    flex-direction: column;
    align-items: stretch;
    gap: 10px;
    padding: 10px 14px 14px !important;
    width: 100% !important;
    max-width: 100% !important;
    background: linear-gradient(180deg, rgba(10,22,40,.99), rgba(13,31,60,.98));
    border-top: 1px solid rgba(191,10,48,.15);
  }
  .oc-r1.mopen { flex-wrap: wrap !important; }
  .oc-nav { flex-direction: column; align-items: stretch; gap: 4px; }
  .oc-lnk, .oc-dtog {
    width: 100% !important;
    max-width: 100% !important;
    justify-content: space-between;
    background: rgba(255,255,255,.05);
    border-radius: 13px;
    font-size: 13px;
  }
  .oc-dd  { width: 100% !important; max-width: 100% !important; }
  .oc-ddm {
    position: static !important;
    transform: none !important;
    left: 0;
    width: 100% !important;
    min-width: 100% !important;
    max-width: 100% !important;
    margin-top: 6px !important;
    border-radius: 13px;
    box-shadow: none;
    animation: none;
  }
  .oc-srch { width: 100% !important; max-width: 100% !important; }
  .oc-cta  { width: 100% !important; max-width: 100% !important; text-align: center; }
  .oc-ymm-in select { max-width: none !important; flex: 1 1 44% !important; }
  .oc-ymm-btn { width: 100% !important; max-width: 100% !important; }
  .oc-ymm { padding: 8px 14px !important; }
  #oc-spec-panel { padding: 8px 14px !important; }
  #oc-spec-panel > div { gap: 6px; }
  .oc-sp-link { margin-left: 0; }
  .block-layout,
  .block-layout--layout,
  [class*="zyro-"],
  [class*="builder-block"],
  [class*="section__"],
  .main-layout,
  .page-wrapper {
    width: 100vw !important;
    max-width: 100vw !important;
    padding: 0 !important;
    margin: 0 !important;
  }
}

@media (max-width: 640px) {
  #oc-nb { font-size: 12px; padding: 8px 12px !important; }
  .oc-btitle { font-size: 22px !important; }
  .oc-badge img { height: 46px !important; }
  .oc-r1  { padding: 10px 12px !important; }
  .oc-ymm { padding: 8px 12px !important; }
  #oc-spec-panel { padding: 8px 12px !important; }
  .oc-sp-pill { padding: 4px 8px; }
  .oc-sp-pill-val { font-size: 12px; }
  #oc-btt {
    width: 44px !important;
    max-width: 44px !important;
    height: 44px !important;
    bottom: 14px !important;
    right: 14px !important;
  }
}
      'CX-90':         {capacity:'5.8 qt',viscosity:'0W-20', interval:'7,500 mi', api:'API SP',       filter:'SH0114302'},
      'Mazda6':        {capacity:'4.5 qt',viscosity:'5W-30', interval:'7,500 mi', api:'API SP',       filter:'PE01-14-302'},
      'MX-5 Miata':    {capacity:'4.0 qt',viscosity:'5W-30', interval:'7,500 mi', api:'API SP',       filter:'PE01-14-302'},
      'CX-30':         {capacity:'4.5 qt',viscosity:'0W-20', interval:'7,500 mi', api:'API SP',       filter:'PE01-14-302'}
    }
  };

  /* ══ EV / NON-ENGINE-OIL FALLBACKS ══ */
  function getFallbackSpecs(make, model){
    var evMap={
      'Audi':{'e-tron':1},
      'BMW':{'iX':1},
      'Cadillac':{'Lyriq':1},
      'Hyundai':{'Ioniq 5':1,'Ioniq 6':1},
      'Kia':{'EV6':1,'EV9':1},
      'Tesla':{'Cybertruck':1,'Model 3':1,'Model S':1,'Model X':1,'Model Y':1},
      'Volkswagen':{'ID.4':1}
    };
    if(evMap[make]&&evMap[make][model]){
      return {
        capacity:'N/A',
        viscosity:'No engine oil',
        interval:'N/A',
        api:'Battery EV',
        filter:'N/A',
        note:'This battery-electric vehicle does not use conventional engine oil.'
      };
    }
    return null;
  }


  /* ══ HELPERS ══ */
  function _dd(label,title,links){
    return '<div class="oc-dd">'+
      '<button class="oc-dtog" type="button" aria-expanded="false">'+label+' &#9662;</button>'+
      '<div class="oc-ddm"><div class="oc-ddt">'+title+'</div>'+
      '<div class="oc-ddl">'+
        links.map(function(l){return '<a href="'+l[1]+'">'+l[0]+'</a>';}).join('')+
      '</div></div></div>';
  }

  function buildYears(){
    var o='<option value="">Year</option>';
    for(var y=2026;y>=1990;y--)
      o+='<option value="'+y+'">'+y+'</option>';
    return o;
  }

  function buildMakes(){
    return '<option value="">Make</option>'+
      MAKES.map(function(m){
        return '<option value="'+m+'">'+m+'</option>';
      }).join('');
  }

  function closeBtn(){
    var btn=D.createElement('button');
    btn.type='button';
    btn.className='oc-sp-close';
    btn.innerHTML='&#10005;';
    btn.addEventListener('click',function(){
      var p=D.getElementById('oc-spec-panel');
      if(p)p.remove();
    });
    return btn;
  }

  /* ══ INIT GUARD ══ */
  var ran=false;
  function init(){
    if(ran||!D.body||D.getElementById('oc-nb'))return;
    ran=true;

    /* 1. Notice Bar */
    var nb=D.createElement('div');
    nb.id='oc-nb';
    nb.innerHTML='&#128295; Need help choosing the right oil? <a href="https://www.oilchoices.com/contact">Ask our experts &#8594;</a>';
    D.body.insertBefore(nb,D.body.firstChild);

    /* 2. Progress Bar */
    var pg=D.createElement('div');
    pg.id='oc-prog';
    D.documentElement.appendChild(pg);

    /* 3. Back To Top */
    var btt=D.createElement('button');
    btt.id='oc-btt';
    btt.type='button';
    btt.setAttribute('aria-label','Back to top');
    btt.innerHTML='<svg viewBox="0 0 24 24"><path d="M18 15l-6-6-6 6"/></svg>';
    D.documentElement.appendChild(btt);

    /* 4. Header */
    var hdr=D.createElement('div');
    hdr.id='oc-hdr';
    hdr.innerHTML=
      '<div class="oc-r1" id="ocR1">'+
        '<a class="oc-brand" href="https://www.oilchoices.com/">'+
          '<span class="oc-badge">'+
            '<img src="https://assets.zyrosite.com/H1TztxDu8joXrzU2/logo_falg_us-removebg-preview2-cK8YmexhrcooOrxd.webp" alt="OilChoices" loading="eager">'+
          '</span>'+
          '<span class="oc-btext">'+
            '<span class="oc-btitle">OilChoices</span>'+
            '<span class="oc-bsub">Engine Oil Guides</span>'+
          '</span>'+
        '</a>'+
        '<button id="ocTog" class="oc-tog" type="button" aria-label="Menu" aria-expanded="false">&#9776;</button>'+
        '<div id="ocNW" class="oc-nwrap">'+
          '<nav class="oc-nav" aria-label="Main navigation">'+
            '<a class="oc-lnk" data-m="/" href="https://www.oilchoices.com/">HOME</a>'+
            _dd('OIL TYPES','&#128738;&#65039; Oil Types',[
              ['Oil Type and Capacity','https://www.oilchoices.com/oil-type-and-capacity'],
              ['Oil Viscosity Guide','https://www.oilchoices.com/oil-viscosity-guide'],
              ['Synthetic vs Conventional','https://www.oilchoices.com/synthetic-vs-conventional-oil']
            ])+
            _dd('OIL CAPACITY','&#128202; Oil Capacity',[
              ['Vehicle Oil Capacity','https://www.oilchoices.com/vehicle-oil-capacity'],
              ['Engine Oil Capacity','https://www.oilchoices.com/engine-oil-capacity'],
              ['Oil Capacity by Make','https://www.oilchoices.com/oil-capacity-by-make'],
              ['Oil Capacity by Engine','https://www.oilchoices.com/oil-capacity-by-engine']
            ])+
            _dd('OIL CHANGE','&#128260; Oil Change',[
              ['Oil Change Intervals','https://www.oilchoices.com/oil-change-intervals'],
              ['Oil Change Cost','https://www.oilchoices.com/oil-change-cost'],
              ['Oil Change Coupons','https://www.oilchoices.com/oil-change-coupons'],
              ['Oil Change Light Reset','https://www.oilchoices.com/oil-change-light-reset'],
              ['Oil Change FAQ','https://www.oilchoices.com/oil-change-faq']
            ])+
            _dd('OIL FILTER','&#128295; Oil Filter',[
              ['Oil Filter Lookup','https://www.oilchoices.com/oil-filter-lookup'],
              ['Oil Filter Cross Reference','https://www.oilchoices.com/oil-filter-cross-reference'],
              ['Oil Filter by Vehicle','https://www.oilchoices.com/oil-filter-by-vehicle'],
              ['Oil Filter by Engine','https://www.oilchoices.com/oil-filter-by-engine']
            ])+
            _dd('QUICK TIPS','&#128161; Quick Tips',[
              ['Oil Problems & Symptoms','https://www.oilchoices.com/oil-problems-and-symptoms'],
              ['Engine Oil Color Guide','https://www.oilchoices.com/engine-oil-color-guide'],
              ['Burning Oil Guide','https://www.oilchoices.com/burning-oil-guide'],
              ['Check Engine Light & Oil','https://www.oilchoices.com/check-engine-light-and-oil-issues']
            ])+
            _dd('RESOURCES','&#128218; Resources',[
              ['Oil Capacity Chart','https://www.oilchoices.com/oil-capacity-chart'],
              ['Oil Type Chart','https://www.oilchoices.com/oil-type-chart'],
              ['Engine Oil Glossary','https://www.oilchoices.com/engine-oil-glossary']
            ])+
            '<a class="oc-lnk" data-m="/blog" href="https://www.oilchoices.com/blog">BLOG</a>'+
            '<a class="oc-lnk" data-m="/about" href="https://www.oilchoices.com/about">ABOUT</a>'+
            '<a class="oc-lnk" data-m="/contact" href="https://www.oilchoices.com/contact">CONTACT</a>'+
          '</nav>'+
          '<div class="oc-srch">'+
            '<input type="text" id="ocSI" placeholder="Search oil specs..." autocomplete="off" aria-label="Search">'+
            '<button type="button" id="ocSB" aria-label="Search">&#128270;</button>'+
          '</div>'+
          '<a class="oc-cta" href="https://www.oilchoices.com/vehicle-oil-capacity">CHECK OIL SPECS</a>'+
        '</div>'+
      '</div>'+
      '<div class="oc-ymm">'+
        '<div class="oc-ymm-in">'+
          '<span class="oc-ymm-lbl">&#128663; Find Your Oil Spec:</span>'+
          '<select id="yY">'+buildYears()+'</select>'+
          '<select id="yM">'+buildMakes()+'</select>'+
          '<select id="yMo" disabled><option value="">Model</option></select>'+
          '<button class="oc-ymm-btn" id="yBtn" type="button">Find Oil Spec &#8594;</button>'+
        '</div>'+
      '</div>';

    nb.insertAdjacentElement('afterend',hdr);

    /* 5. Mobile toggle */
    var nw=D.getElementById('ocNW'),
        r1=D.getElementById('ocR1'),
        tog=D.getElementById('ocTog');
    tog.addEventListener('click',function(){
      var o=nw.classList.toggle('open');
      r1.classList.toggle('mopen',o);
      this.setAttribute('aria-expanded',String(o));
      this.innerHTML=o?'&#10005;':'&#9776;';
    });

    /* 6. Dropdowns */
    var dds=hdr.querySelectorAll('.oc-dd');
    dds.forEach(function(dd){
      dd.querySelector('.oc-dtog').addEventListener('click',function(e){
        e.preventDefault();
        e.stopPropagation();
        var was=dd.classList.contains('open');
        dds.forEach(function(d){
          d.classList.remove('open');
          d.querySelector('.oc-dtog').setAttribute('aria-expanded','false');
          d.querySelector('.oc-dtog').classList.remove('active');
        });
        if(!was){
          dd.classList.add('open');
          this.setAttribute('aria-expanded','true');
          this.classList.add('active');
        }
      });
    });

    /* 7. Outside click */
    D.addEventListener('click',function(e){
      dds.forEach(function(dd){
        if(!dd.contains(e.target)){
          dd.classList.remove('open');
          var b=dd.querySelector('.oc-dtog');
          b.setAttribute('aria-expanded','false');
          b.classList.remove('active');
        }
      });
      if(W.innerWidth<=960&&nw.classList.contains('open')&&
         !nw.contains(e.target)&&!tog.contains(e.target)){
        nw.classList.remove('open');
        r1.classList.remove('mopen');
        tog.setAttribute('aria-expanded','false');
        tog.innerHTML='&#9776;';
      }
    });

    /* 8. Search */
    var si=D.getElementById('ocSI'),sb=D.getElementById('ocSB');
    function doSearch(){
      var q=(si.value||'').trim();
      if(!q)return;
      W.location.href='https://www.google.com/search?q='+encodeURIComponent(q+' site:oilchoices.com');
    }
    sb.addEventListener('click',doSearch);
    si.addEventListener('keydown',function(e){if(e.key==='Enter')doSearch();});

    /* 9. YMM */
    var yY=D.getElementById('yY'),
        yM=D.getElementById('yM'),
        yMo=D.getElementById('yMo'),
        yBtn=D.getElementById('yBtn');

    yM.addEventListener('change',function(){
      var list=MODELS[this.value]||[];
      yMo.innerHTML='<option value="">Model</option>'+
        list.map(function(v){return '<option value="'+v+'">'+v+'</option>';}).join('');
      yMo.disabled=list.length===0;
      hidePanel();
    });
    yY.addEventListener('change',hidePanel);
    yMo.addEventListener('change',hidePanel);

    yBtn.addEventListener('click',function(){
      var yr=yY.value,mk=yM.value,mo=yMo.value;
      if(!yr||!mk){shake(yBtn);showError('Please select at least Year and Make.');return;}
      var specs=(DB[mk]&&DB[mk][mo])||getFallbackSpecs(mk,mo);
      if(mo&&specs){showResult(yr,mk,mo,specs);return;}
      if(mo){showMissing(yr,mk,mo);return;}
      var slug=[yr,mk,mo].filter(Boolean).join('-')
        .toLowerCase().replace(/\s+/g,'-').replace(/[^a-z0-9-]/g,'');
      W.location.href='https://www.oilchoices.com/vehicle-oil-capacity'+(slug?'/'+slug:'');
    });

    /* Panel helpers */
    function getPanel(){
      var p=D.getElementById('oc-spec-panel');
      if(!p){
        p=D.createElement('div');
        p.id='oc-spec-panel';
        var ymm=D.querySelector('.oc-ymm');
        if(ymm)ymm.insertAdjacentElement('afterend',p);
        else hdr.appendChild(p);
      }
      return p;
    }

    function pill(label,val,col){
      var sp=D.createElement('span');
      sp.className='oc-sp-pill';
      sp.style.borderLeft='3px solid '+col;
      sp.innerHTML=
        '<span class="oc-sp-pill-lbl" style="color:'+col+'">'+label+'</span>'+
        '<span class="oc-sp-pill-val">'+val+'</span>';
      return sp;
    }

    function showResult(yr,mk,mo,s){
      var p=getPanel();
      p.className='';
      p.innerHTML='';
      var wrap=D.createElement('div');

      var veh=D.createElement('span');
      veh.className='oc-sp-veh';
      veh.innerHTML='&#128269; '+yr+' '+mk+' '+mo;
      wrap.appendChild(veh);

      wrap.appendChild(pill('Capacity',   s.capacity,  '#002868'));
      wrap.appendChild(pill('Viscosity',  s.viscosity, '#BF0A30'));
      wrap.appendChild(pill('Interval',   s.interval,  '#1a5c1a'));
      wrap.appendChild(pill('Standard',   s.api,       '#5a3a00'));
      wrap.appendChild(pill('Filter',     s.filter,    '#2a2a6e'));

      var lnk=D.createElement('a');
      lnk.className='oc-sp-link';
      lnk.href='https://www.oilchoices.com/car-oil-capacity';
      lnk.innerHTML=(s.note?'EV Care Guide &#8599;':'Full Guide &#8599;');
      wrap.appendChild(lnk);

      wrap.appendChild(closeBtn());
      p.appendChild(wrap);
    }

    function showError(msg){
      var p=getPanel();
      p.className='oc-sp-err';
      p.innerHTML='';
      var wrap=D.createElement('div');
      var sp=D.createElement('span');
      sp.innerHTML='&#9888;&#65039; '+msg;
      wrap.appendChild(sp);
      wrap.appendChild(closeBtn());
      p.appendChild(wrap);
    }

    function showMissing(yr,mk,mo){
      var p=getPanel();
      p.className='oc-sp-err';
      p.innerHTML='';
      var wrap=D.createElement('div');
      var sp=D.createElement('span');
      var slug=[yr,mk,mo].filter(Boolean).join('-')
        .toLowerCase().replace(/\s+/g,'-').replace(/[^a-z0-9-]/g,'');
      sp.innerHTML='&#8505;&#65039; Quick header specs are not preloaded yet for '+yr+' '+mk+' '+mo+'. Open the full guide for the latest fitment.';
      wrap.appendChild(sp);

      var lnk=D.createElement('a');
      lnk.className='oc-sp-link';
      lnk.href='https://www.oilchoices.com/vehicle-oil-capacity'+(slug?'/'+slug:'');
      lnk.innerHTML='Open Full Guide &#8599;';
      wrap.appendChild(lnk);

      wrap.appendChild(closeBtn());
      p.appendChild(wrap);
    }

    function hidePanel(){
      var p=D.getElementById('oc-spec-panel');
      if(p)p.remove();
    }

    function shake(el){
      var pos=[7,-7,5,-5,3,-3,0],i=0;
      var t=setInterval(function(){
        el.style.transform='translateX('+(pos[i]||0)+'px)';
        if(++i>=pos.length){clearInterval(t);el.style.transform='';}
      },55);
    }

    /* 10. Active nav */
    var path=(W.location.pathname||'/').replace(/\/+$/,'')||'/';
    hdr.querySelectorAll('.oc-lnk[data-m]').forEach(function(l){
      var m=l.getAttribute('data-m');
      l.classList.toggle('active',m==='/'?path==='/':path.indexOf(m)===0);
    });

    /* 11. BTT */
    btt.addEventListener('click',function(){W.scrollTo({top:0,behavior:'smooth'});});

    /* 12. Scroll */
    var tick=false;
    function syncNoticeOffset(){
      var wasCompact=nb.classList.contains('compact');
      nb.classList.remove('compact');
      nb.style.minHeight='';
      var stable=Math.max(40,Math.round(nb.getBoundingClientRect().height));
      nb.style.minHeight=stable+'px';
      if(wasCompact)nb.classList.add('compact');
      D.documentElement.style.setProperty('--oc-nb-h',stable+'px');
    }
    function onScroll(){
      var st=W.scrollY||0;
      var dh=D.documentElement.scrollHeight-W.innerHeight;
      pg.style.width=(dh>0?Math.min((st/dh)*100,100):0)+'%';
      btt.classList.toggle('show',st>350);
      hdr.classList.toggle('scrolled',st>30);
      nb.classList.toggle('compact',st>30);
      tick=false;
    }
    W.addEventListener('scroll',function(){
      if(!tick){W.requestAnimationFrame(onScroll);tick=true;}
    },{passive:true});
    W.addEventListener('resize',function(){
      syncNoticeOffset();
      if(!tick){W.requestAnimationFrame(onScroll);tick=true;}
    });
    syncNoticeOffset();
    onScroll();

    /* 13. Hide native Hostinger header */
    setTimeout(function(){
      var sels=['header','[role="banner"]','.site-header','.header','.navbar','.topbar'];
      var seen=[];
      sels.forEach(function(sel){
        try{
          D.querySelectorAll(sel).forEach(function(el){
            if(seen.indexOf(el)>-1)return;
            seen.push(el);
            if(el.id==='oc-hdr'||el.id==='oc-nb'||
               el.id==='oc-prog'||el.id==='oc-btt'||
               el.id==='oc-spec-panel')return;
            if(el.closest&&(el.closest('#oc-hdr')||el.closest('#oc-nb')))return;
            try{
              var r=el.getBoundingClientRect();
              var cs=W.getComputedStyle(el);
              var near=r.top<160||cs.position==='fixed'||cs.position==='sticky';
              var wide=r.width>W.innerWidth*0.55;
              var goodH=r.height>=35&&r.height<=290;
              var isH=/header|banner|navbar|topbar/
                .test(((el.tagName||'')+' '+(el.className||'')).toLowerCase())
                ||el.tagName.toLowerCase()==='header';
              if(isH&&near&&wide&&goodH){
                el.classList.add('oc-kill');
                el.setAttribute('aria-hidden','true');
              }
            }catch(ex){}
          });
        }catch(ex){}
      });
    },120);
  }

  /* Safe boot */
  if(D.readyState==='loading'){
    D.addEventListener('DOMContentLoaded',init);
  } else {
    init();
  }

})();
