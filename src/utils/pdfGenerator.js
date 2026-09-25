/**
 * NECTRA SERVICES – Company Profile PDF Generator v3
 * Fixed: About Us split into 2 pages, proper Y tracking, no overflow,
 *        larger readable fonts, product detail grid never cut off.
 *
 * Page layout (A4 = 210×297 mm):
 *   Header: 0–22 mm
 *   Content: 27–279 mm   (252 mm usable)
 *   Footer: 283–297 mm
 */

import { jsPDF } from 'jspdf'
import products    from '../data/products.js'
import services    from '../data/services.js'
import businessInfo from '../data/businessInfo.js'
import { whyUs, stats, industries } from '../data/homeData.js'

// ─── Brand Colors ─────────────────────────────────────────────────────────────
const C = {
  navy:  [7,   20,  38 ],
  blue:  [11,  108, 184],
  cyan:  [0,   176, 196],
  white: [255, 255, 255],
  bg:    [244, 248, 252],  // light page bg
  dark:  [23,  32,  51 ],
  muted: [100, 116, 139],
  brd:   [226, 232, 240],  // border
  green: [18,  140, 126],
  lbBlue:[180, 210, 235],
}

// ─── Page dimensions ──────────────────────────────────────────────────────────
const W   = 210          // A4 width  mm
const H   = 297          // A4 height mm
const ML  = 15           // left margin
const MR  = 15           // right margin
const CW  = W - ML - MR // content width = 180 mm
const HDR = 22           // header band height
const FTR = 14           // footer band height
const CT  = HDR + 5      // content top y  = 27
const CB  = H - FTR - 4  // content bottom y = 279

// ─── Primitives ───────────────────────────────────────────────────────────────
const sf = (d, c) => d.setFillColor(...c)
const st = (d, c) => d.setTextColor(...c)
const sd = (d, c) => d.setDrawColor(...c)

function fr(d, x, y, w, h, c) { sf(d, c); d.rect(x, y, w, h, 'F') }
function sr(d, x, y, w, h, c = C.brd, lw = 0.3) { sd(d, c); d.setLineWidth(lw); d.rect(x, y, w, h) }
function hl(d, x, y, w, c = C.cyan, lw = 0.3) { sd(d, c); d.setLineWidth(lw); d.line(x, y, x + w, y) }

/** Print wrapped text; returns Y after last line. */
function pt(d, text, x, y, maxW, size, color, bold = false, lh = null) {
  st(d, color); d.setFont('helvetica', bold ? 'bold' : 'normal'); d.setFontSize(size)
  const lineH = lh || size * 0.52
  const lines = d.splitTextToSize(text, maxW)
  d.text(lines, x, y)
  return y + lines.length * lineH
}

/** Load image src → base64 dataURL */
async function loadImg(src) {
  return new Promise(res => {
    const img = new Image(); img.crossOrigin = 'anonymous'
    img.onload = () => {
      try {
        const c = document.createElement('canvas')
        c.width = img.naturalWidth; c.height = img.naturalHeight
        c.getContext('2d').drawImage(img, 0, 0)
        res(c.toDataURL('image/jpeg', 0.88))
      } catch { res(null) }
    }
    img.onerror = () => res(null)
    img.src = src
  })
}

// ─── Page chrome helpers ──────────────────────────────────────────────────────

function drawPageHeader(d, rightTag, rightSub = '') {
  fr(d, 0, 0, W, HDR, C.navy)
  fr(d, 0, 0, 4, HDR, C.cyan)           // left cyan stripe
  st(d, C.white); d.setFont('helvetica', 'bold'); d.setFontSize(11)
  d.text('NECTRA SERVICES', 9, 9)
  st(d, C.cyan); d.setFont('helvetica', 'normal'); d.setFontSize(7)
  d.text('MS & SS Fabrication Specialist', 9, 15.5)
  st(d, [190, 215, 240]); d.setFont('helvetica', 'bold'); d.setFontSize(10)
  d.text(rightTag, W - MR, 9, { align: 'right' })
  if (rightSub) {
    st(d, [160, 190, 218]); d.setFont('helvetica', 'normal'); d.setFontSize(7)
    d.text(rightSub, W - MR, 15.5, { align: 'right' })
  }
}

function drawPageFooter(d, pg) {
  const fy = H - FTR
  hl(d, 0, fy, W, C.blue, 0.3)
  fr(d, 0, fy, W, FTR, [4, 12, 28])
  st(d, [140, 165, 200]); d.setFont('helvetica', 'normal'); d.setFontSize(7)
  d.text('NECTRA SERVICES  |  Vatva, Ahmedabad  |  +91 99791 70404  |  info@nectraservices.com', ML, fy + 5.5)
  st(d, C.cyan); d.setFont('helvetica', 'bold'); d.setFontSize(8)
  d.text(`Page ${pg}`, W - MR, fy + 5.5, { align: 'right' })
}

/** Mini section label + cyan underline; returns y after */
function sTag(d, label, y) {
  st(d, C.cyan); d.setFont('helvetica', 'bold'); d.setFontSize(8)
  d.text(label, ML, y)
  hl(d, ML, y + 3.5, CW, C.cyan, 0.3)
  return y + 9
}

/** Large section title; returns y after */
function sTitle(d, title, y) {
  st(d, C.navy); d.setFont('helvetica', 'bold'); d.setFontSize(17)
  d.text(title, ML, y)
  return y + 9
}

// ─── PAGE 1: COVER ───────────────────────────────────────────────────────────

async function drawCover(d, heroImg, logoImg) {
  fr(d, 0, 0, W, H, C.navy)

  // Hero photo (right 58 %)
  if (heroImg) {
    d.addImage(heroImg, 'JPEG', W * 0.42, 0, W * 0.58, H)
    d.setGState(d.GState({ opacity: 0.68 }))
    fr(d, W * 0.42, 0, W * 0.58, H, C.navy)
    d.setGState(d.GState({ opacity: 1 }))
  }

  fr(d, 0, 0, 4, H, C.cyan)          // left stripe
  fr(d, 4, 0, W - 4, 2, C.blue)      // top line

  let y = 26
  if (logoImg) d.addImage(logoImg, 'PNG', ML + 2, y, 24, 24)
  y += 30

  st(d, C.white); d.setFont('helvetica', 'bold'); d.setFontSize(30)
  d.text('NECTRA', ML + 2, y); y += 12
  st(d, C.cyan); d.text('SERVICES', ML + 2, y); y += 9
  st(d, [180, 210, 235]); d.setFont('helvetica', 'normal'); d.setFontSize(8.5)
  d.text('MS & SS FABRICATION SPECIALIST', ML + 2, y); y += 8
  hl(d, ML + 2, y, 90, C.cyan, 0.7); y += 10

  const headlines = ['PRECISION', 'FABRICATION &', 'ENGINEERING', 'SOLUTIONS']
  d.setFont('helvetica', 'bold'); d.setFontSize(21)
  headlines.forEach((l, i) => {
    st(d, i === 2 ? C.cyan : C.white); d.text(l, ML + 2, y); y += 10.5
  })

  y += 4
  st(d, [180, 210, 235]); d.setFont('helvetica', 'normal'); d.setFontSize(9)
  d.text('Your trusted fabrication partner for quality', ML + 2, y); y += 5.5
  d.text('engineering solutions since 2009.', ML + 2, y); y += 14

  const badges = [{ v: '15+', l: 'Years' }, { v: '500+', l: 'Clients' }, { v: '2000+', l: 'Projects' }, { v: '12+', l: 'Industries' }]
  badges.forEach((b, i) => {
    const bx = ML + 2 + i * 29
    fr(d, bx, y, 25, 19, [15, 35, 65]); fr(d, bx, y, 25, 2.5, C.cyan)
    st(d, C.cyan); d.setFont('helvetica', 'bold'); d.setFontSize(14)
    d.text(b.v, bx + 12.5, y + 11, { align: 'center' })
    st(d, [200, 215, 230]); d.setFont('helvetica', 'normal'); d.setFontSize(6.5)
    d.text(b.l, bx + 12.5, y + 16.5, { align: 'center' })
  })

  const biy = H - 22
  fr(d, 0, biy, W, 22, [4, 12, 28]); hl(d, 0, biy, W, C.blue, 0.4)
  st(d, [180, 200, 220]); d.setFont('helvetica', 'normal'); d.setFontSize(8)
  d.text('35, Avadh Estate, Nr Panchratna Estate, Ramol Cross Road, Vatva, Ahmedabad - 382445', ML + 2, biy + 7.5)
  d.text('+91 99791 70404   |   info@nectraservices.com   |   www.nectraservices.com', ML + 2, biy + 14)
  st(d, C.cyan); d.setFont('helvetica', 'bold'); d.setFontSize(8)
  d.text('COMPANY PROFILE  2024-25', W - MR, biy + 10.5, { align: 'right' })
}

// ─── PAGE 2: ABOUT US Part 1 — Company overview + factory ───────────────────

async function drawAboutPart1(d, factoryImg1, factoryImg2, logoImg, pg) {
  drawPageHeader(d, 'ABOUT US', 'Our Story & Company Overview')
  drawPageFooter(d, pg)

  let y = CT
  y = sTag(d, 'ABOUT NECTRA SERVICES', y)
  y = sTitle(d, 'Your Trusted Fabrication Partner', y)

  // ── Two-col: Blue card | Description text ────────────────────────────────
  const leftW = CW * 0.40   // = 72 mm
  const rightX = ML + leftW + 8
  const rightW = CW - leftW - 8  // = 100 mm
  const cardH  = 78

  // Blue card
  fr(d, ML, y, leftW, cardH, C.blue); fr(d, ML, y, leftW, 3, C.cyan)
  if (logoImg) d.addImage(logoImg, 'PNG', ML + leftW / 2 - 14, y + 8, 28, 28)
  st(d, C.white); d.setFont('helvetica', 'bold'); d.setFontSize(13)
  d.text('NECTRA SERVICES', ML + leftW / 2, y + 44, { align: 'center' })
  st(d, C.cyan); d.setFont('helvetica', 'normal'); d.setFontSize(8.5)
  d.text('Vatva, Ahmedabad, Gujarat', ML + leftW / 2, y + 52, { align: 'center' })
  st(d, [215, 235, 255]); d.setFontSize(8)
  d.text('MS & SS Fabrication Specialist', ML + leftW / 2, y + 59.5, { align: 'center' })
  st(d, [200, 225, 248]); d.setFontSize(7.5)
  d.text('Precision | Quality | Timely Delivery', ML + leftW / 2, y + 67, { align: 'center' })

  // Right column – track its own y (ry) separately
  let ry = y + 3
  const para1 = 'NECTRA SERVICES is a leading MS & SS Fabrication company based in Ahmedabad, Gujarat. With over 15+ years of experience in precision fabrication and engineering, we have established ourselves as a trusted partner for industries across Gujarat and India.'
  ry = pt(d, para1, rightX, ry, rightW, 9, C.dark) + 5

  const para2 = 'We specialize in Generator Canopies, Electrical Panel Bodies, SS Cyclone Tanks, CNC Laser Cutting, MIG/TIG Welding, Laser Welding, and custom engineering solutions. Our skilled team uses state-of-the-art equipment and advanced manufacturing processes.'
  ry = pt(d, para2, rightX, ry, rightW, 8.5, C.muted) + 5

  const checks = ['15+ Years of Experience', 'Precision Manufacturing', 'ISO Quality Standards', 'Timely Delivery Commitment', 'Competitive Pricing', '500+ Happy Clients']
  st(d, C.blue); d.setFont('helvetica', 'bold'); d.setFontSize(9)
  checks.forEach(c => { d.text('- ' + c, rightX, ry); ry += 6.2 })

  // Advance y past BOTH columns
  y += Math.max(cardH, ry - y) + 8

  // ── Three badge chips ─────────────────────────────────────────────────────
  const chips = ['ISO Quality Assured', 'GST Registered', 'Ahmedabad, Gujarat']
  const chipW = (CW - 2 * 7) / 3
  chips.forEach((chip, i) => {
    const bx = ML + i * (chipW + 7)
    fr(d, bx, y, chipW, 14, C.bg); sr(d, bx, y, chipW, 14, C.brd); fr(d, bx, y, chipW, 2.5, C.blue)
    st(d, C.navy); d.setFont('helvetica', 'bold'); d.setFontSize(8.5)
    d.text(chip, bx + chipW / 2, y + 10, { align: 'center' })
  })
  y += 20

  // ── Factory Gallery ───────────────────────────────────────────────────────
  hl(d, ML, y, CW, C.brd, 0.3); y += 6
  y = sTag(d, 'OUR FACILITY', y)
  y = sTitle(d, 'Our Factory & Workshop', y)

  st(d, C.muted); d.setFont('helvetica', 'normal'); d.setFontSize(9)
  d.text('A look inside our state-of-the-art fabrication facility in Ahmedabad', ML, y); y += 7

  const photos = [factoryImg1, factoryImg2].filter(Boolean)
  const phW = photos.length > 1 ? (CW - 7) / 2 : CW
  const phH = 46
  photos.forEach((img, i) => {
    const px = ML + i * (phW + 7)
    d.addImage(img, 'JPEG', px, y, phW, phH)
    fr(d, px, y, phW, 3, C.cyan)
    sd(d, C.blue); d.setLineWidth(0.5); d.rect(px, y, phW, phH)
  })
  y += phH + 7

  // Capability pills
  const caps = ['CNC Laser Cutting', 'Laser Welding', 'CNC Bending', 'Powder Coating', 'Quality Control']
  const capW = (CW - 4 * 4) / 5
  caps.forEach((cap, i) => {
    const cx = ML + i * (capW + 4)
    fr(d, cx, y, capW, 12, C.navy); fr(d, cx, y, capW, 2.5, C.cyan)
    st(d, C.white); d.setFont('helvetica', 'bold'); d.setFontSize(7.5)
    d.text(cap, cx + capW / 2, y + 8.5, { align: 'center' })
  })
}

// ─── PAGE 3: ABOUT US Part 2 — Why Choose Us + Mission & Vision ──────────────

async function drawAboutPart2(d, pg) {
  drawPageHeader(d, 'ABOUT US', 'Why Choose Us & Our Foundation')
  drawPageFooter(d, pg)

  let y = CT
  y = sTag(d, 'WHY CHOOSE US', y)
  y = sTitle(d, 'What Makes Us Different', y)

  // 6 cards — 3 per row, 2 rows
  const wcW = (CW - 2 * 7) / 3  // ≈ 55 mm each
  const wcH = 38
  ;[whyUs.slice(0, 3), whyUs.slice(3)].forEach(row => {
    row.forEach((item, i) => {
      const cx = ML + i * (wcW + 7)
      fr(d, cx, y, wcW, wcH, C.bg); sr(d, cx, y, wcW, wcH, C.brd); fr(d, cx, y, wcW, 3, C.cyan)
      st(d, C.blue); d.setFont('helvetica', 'bold'); d.setFontSize(9.5)
      d.text(item.title, cx + wcW / 2, y + 12, { align: 'center' })
      st(d, C.muted); d.setFont('helvetica', 'normal'); d.setFontSize(8)
      const dl = d.splitTextToSize(item.desc, wcW - 8)
      d.text(dl, cx + wcW / 2, y + 19, { align: 'center' })
    })
    y += wcH + 8
  })
  y += 6

  // ── Mission & Vision ─────────────────────────────────────────────────────
  hl(d, ML, y, CW, C.brd, 0.3); y += 7
  y = sTag(d, 'OUR FOUNDATION', y)
  y = sTitle(d, 'Mission & Vision', y)

  const mvW = (CW - 10) / 2
  const mvH = 52
  const mvItems = [
    { label: 'Our Mission', color: C.blue,
      text: 'To deliver precision-engineered MS & SS fabrication solutions with uncompromising quality, timely delivery, and complete customer satisfaction. We aim to be the most trusted fabrication partner in Gujarat and beyond.' },
    { label: 'Our Vision',  color: C.blue,
      text: 'To become the leading fabrication and engineering solutions provider in India, known for innovation, precision, and excellence. We envision expanding our capabilities to serve clients across diverse industries nationwide.' },
  ]
  mvItems.forEach((mv, i) => {
    const mx = ML + i * (mvW + 10)
    fr(d, mx, y, mvW, mvH, C.bg); sr(d, mx, y, mvW, mvH, C.brd); fr(d, mx, y, mvW, 3, mv.color)
    st(d, mv.color); d.setFont('helvetica', 'bold'); d.setFontSize(11)
    d.text(mv.label, mx + 8, y + 13)
    pt(d, mv.text, mx + 8, y + 21, mvW - 14, 8.5, C.dark)
  })
  y += mvH + 10

  // ── Stats row ─────────────────────────────────────────────────────────────
  hl(d, ML, y, CW, C.brd, 0.3); y += 9
  const sw = (CW - 3 * 7) / 4
  stats.forEach((st2, i) => {
    const sx = ML + i * (sw + 7)
    fr(d, sx, y, sw, 24, C.navy); fr(d, sx, y, sw, 3, C.cyan)
    st(d, C.cyan); d.setFont('helvetica', 'bold'); d.setFontSize(17)
    d.text(st2.value, sx + sw / 2, y + 14, { align: 'center' })
    st(d, [180, 205, 225]); d.setFont('helvetica', 'normal'); d.setFontSize(7.5)
    d.text(st2.label, sx + sw / 2, y + 20.5, { align: 'center' })
  })
}

// ─── PAGE 4: SERVICES + INDUSTRIES ───────────────────────────────────────────

async function drawServices(d, pg) {
  drawPageHeader(d, 'OUR SERVICES', 'All Fabrication & Engineering Services')
  drawPageFooter(d, pg)

  let y = CT
  y = sTag(d, 'SERVICES', y)
  y = sTitle(d, 'All Fabrication Services', y)
  st(d, C.muted); d.setFont('helvetica', 'normal'); d.setFontSize(9)
  d.text('From concept to completion – precision engineering for every industry', ML, y); y += 8

  // 12 services — 3 cols × 4 rows
  const svcW = (CW - 2 * 6) / 3  // ≈ 56 mm
  const svcH = 30
  const svcGap = 5

  services.forEach((svc, idx) => {
    const col = idx % 3
    const row = Math.floor(idx / 3)
    const cx = ML + col * (svcW + 6)
    const cy = y + row * (svcH + svcGap)

    fr(d, cx, cy, svcW, svcH, C.bg); sr(d, cx, cy, svcW, svcH, C.brd); fr(d, cx, cy, svcW, 2.5, C.blue)
    // icon square
    fr(d, cx + 5, cy + 5, 15, 15, [218, 235, 252])
    st(d, C.blue); d.setFont('helvetica', 'bold'); d.setFontSize(11); d.text('#', cx + 12.5, cy + 15, { align: 'center' })
    // title
    st(d, C.navy); d.setFont('helvetica', 'bold'); d.setFontSize(8.5)
    const tl = d.splitTextToSize(svc.name, svcW - 25)
    d.text(tl, cx + 23, cy + 12)
    // desc
    st(d, C.muted); d.setFont('helvetica', 'normal'); d.setFontSize(7.5)
    const dl = d.splitTextToSize(svc.desc, svcW - 9)
    d.text(dl, cx + 6, cy + 23)
  })
  y += 4 * (svcH + svcGap) + 3

  // ── Industries ────────────────────────────────────────────────────────────
  hl(d, ML, y, CW, C.brd, 0.3); y += 7
  y = sTag(d, 'INDUSTRIES WE SERVE', y)
  y = sTitle(d, 'Industries We Serve', y)

  // 12 industries — 6 cols × 2 rows
  const indW = (CW - 5 * 5) / 6  // ≈ 25.8 mm
  const indH = 18
  industries.forEach((ind, i) => {
    const col = i % 6
    const row = Math.floor(i / 6)
    const ix = ML + col * (indW + 5)
    const iy = y + row * (indH + 4)
    fr(d, ix, iy, indW, indH, C.white); sr(d, ix, iy, indW, indH, C.brd); fr(d, ix, iy, indW, 2, C.blue)
    st(d, C.blue); d.setFont('helvetica', 'bold'); d.setFontSize(6.5)
    d.text(ind.name, ix + indW / 2, iy + 12, { align: 'center' })
  })
  y += 2 * (indH + 4) + 5

  // ── CTA bar ───────────────────────────────────────────────────────────────
  fr(d, ML, y, CW, 19, C.navy); fr(d, ML, y, 4, 19, C.cyan)
  st(d, C.white); d.setFont('helvetica', 'bold'); d.setFontSize(11)
  d.text('Need Custom Fabrication Solutions?', ML + 9, y + 8)
  st(d, [180, 210, 235]); d.setFont('helvetica', 'normal'); d.setFontSize(8.5)
  d.text('+91 99791 70404   |   info@nectraservices.com', ML + 9, y + 14.5)
}

// ─── PRODUCT PAGES: one full A4 per product ───────────────────────────────────

async function drawProductPage(d, product, imgData, pg) {
  drawPageHeader(d, 'OUR PRODUCTS', product.name)
  drawPageFooter(d, pg)

  let y = CT

  // Section tag + product name
  y = sTag(d, 'PRODUCT DETAILS', y)
  st(d, C.navy); d.setFont('helvetica', 'bold'); d.setFontSize(17)
  const nameL = d.splitTextToSize(product.name, CW)
  d.text(nameL, ML, y); y += nameL.length * 8 + 3

  // ── Two-col: Photo LEFT | Info RIGHT ──────────────────────────────────────
  const imgW = CW * 0.47      // ≈ 84.6 mm
  const infoX = ML + imgW + 8
  const infoW = CW - imgW - 8 // ≈ 87.4 mm
  const imgH  = 72

  // Product photo
  if (imgData) {
    d.addImage(imgData, 'JPEG', ML, y, imgW, imgH)
    fr(d, ML, y, imgW, 3, C.cyan)
    sd(d, C.blue); d.setLineWidth(0.6); d.rect(ML, y, imgW, imgH)
  } else {
    fr(d, ML, y, imgW, imgH, C.navy)
    st(d, C.cyan); d.setFontSize(9); d.text(product.name, ML + imgW / 2, y + imgH / 2, { align: 'center' })
  }

  // Right info panel
  let ry = y + 3
  hl(d, infoX, ry, infoW, C.cyan, 0.5); ry += 6

  st(d, C.muted); d.setFont('helvetica', 'normal'); d.setFontSize(8)
  d.text('Short Description', infoX, ry); ry += 5
  ry = pt(d, product.desc, infoX, ry, infoW, 9, C.dark) + 6

  // Motto pill
  if (product.motto) {
    fr(d, infoX, ry, infoW, 15, [224, 240, 255]); fr(d, infoX, ry, 3.5, 15, C.blue)
    ry = pt(d, product.motto, infoX + 7, ry + 7, infoW - 10, 7.5, C.blue, true)
    ry += 5
  }

  y += imgH + 8

  // ── Full Description ──────────────────────────────────────────────────────
  y = sTag(d, 'FULL DESCRIPTION', y)
  y = pt(d, product.fullDesc, ML, y, CW, 9, C.dark) + 9

  // ── Detail column grid ────────────────────────────────────────────────────
  // Collect columns (max 4)
  const cols = []
  if (product.subProducts?.length) cols.push({ label: 'Products / Variants', items: product.subProducts })
  if (product.materials?.length)   cols.push({ label: 'Materials Used',       items: product.materials   })
  if (product.features?.length)    cols.push({ label: 'Key Features',         items: product.features    })
  if (product.applications?.length) cols.push({ label: 'Applications',        items: product.applications})
  if (product.servicesList?.length && cols.length < 4)
                                   cols.push({ label: 'Services Offered',     items: product.servicesList})
  const numCols = Math.min(cols.length, 4)

  if (numCols > 0) {
    hl(d, ML, y, CW, C.brd, 0.3); y += 6

    const colGap = 5
    const colW   = (CW - colGap * (numCols - 1)) / numCols

    // Column header bars
    cols.slice(0, numCols).forEach((col, ci) => {
      const cx = ML + ci * (colW + colGap)
      fr(d, cx, y, colW, 11, C.navy); fr(d, cx, y, colW, 2.5, C.cyan)
      st(d, C.white); d.setFont('helvetica', 'bold'); d.setFontSize(8)
      d.text(col.label, cx + colW / 2, y + 8, { align: 'center' })
    })
    y += 18

    // Column content — draw all columns starting at same y
    const itemsStartY = y
    const ITEM_SIZE   = 8.5  // pt
    const ITEM_LH     = 5.0  // mm per line
    const ITEM_GAP    = 2    // mm after each item

    // Find actual rendered height of each column
    let maxColH = 0
    cols.slice(0, numCols).forEach((col, ci) => {
      const cx  = ML + ci * (colW + colGap)
      let   cy  = itemsStartY
      col.items.forEach(item => {
        const lines = d.splitTextToSize(item, colW - 9)
        // bullet
        st(d, C.blue); d.setFont('helvetica', 'bold'); d.setFontSize(9)
        d.text('-', cx + 3, cy)
        // text
        st(d, C.dark); d.setFont('helvetica', 'normal'); d.setFontSize(ITEM_SIZE)
        d.text(lines, cx + 8, cy)
        cy += lines.length * ITEM_LH + ITEM_GAP
      })
      const colH = cy - itemsStartY
      if (colH > maxColH) maxColH = colH
    })

    y = itemsStartY + maxColH + 7
  }

  // ── Bottom CTA strip (only if space remains) ──────────────────────────────
  const ctaH = 16
  if (y + ctaH + 6 <= CB) {
    fr(d, ML, y, CW, ctaH, C.navy); fr(d, ML, y, 4, ctaH, C.cyan)
    st(d, C.white); d.setFont('helvetica', 'bold'); d.setFontSize(9.5)
    d.text('Interested in ' + product.name + '?  Contact us today!', ML + 9, y + 7)
    st(d, [180, 210, 235]); d.setFont('helvetica', 'normal'); d.setFontSize(8)
    d.text('+91 99791 70404   |   info@nectraservices.com   |   WhatsApp: +91 99791 70404', ML + 9, y + 13)
  }
}

// ─── CONTACT US PAGE ──────────────────────────────────────────────────────────

async function drawContact(d, logoImg, pg) {
  drawPageHeader(d, 'CONTACT US', 'Get In Touch With NECTRA SERVICES')
  drawPageFooter(d, pg)

  let y = CT
  const info = businessInfo

  y = sTag(d, 'CONTACT NECTRA SERVICES', y)
  y = sTitle(d, 'Get In Touch With Us', y)

  const c1W = CW * 0.44       // ≈ 79.2 mm
  const c2X = ML + c1W + 8
  const c2W = CW - c1W - 8   // ≈ 92.8 mm
  const cardH = 130

  // ── LEFT: Contact info card ───────────────────────────────────────────────
  fr(d, ML, y, c1W, cardH, C.bg); sr(d, ML, y, c1W, cardH, C.brd); fr(d, ML, y, c1W, 3.5, C.blue)
  if (logoImg) d.addImage(logoImg, 'PNG', ML + 8, y + 8, 18, 18)
  st(d, C.navy); d.setFont('helvetica', 'bold'); d.setFontSize(11.5)
  d.text('NECTRA SERVICES', ML + 31, y + 15)
  st(d, C.muted); d.setFont('helvetica', 'normal'); d.setFontSize(8.5)
  d.text('MS & SS Fabrication Specialist', ML + 31, y + 21.5)
  hl(d, ML + 7, y + 26, c1W - 14, C.brd, 0.4)

  // Contact person box
  fr(d, ML + 7, y + 29, c1W - 14, 15, [225, 238, 255]); sr(d, ML + 7, y + 29, c1W - 14, 15, [195, 220, 250])
  st(d, C.muted); d.setFont('helvetica', 'normal'); d.setFontSize(7.5)
  d.text('CONTACT PERSON', ML + 11, y + 35)
  st(d, C.navy); d.setFont('helvetica', 'bold'); d.setFontSize(10)
  d.text(info.contact_person, ML + 11, y + 41.5)

  const contactRows = [
    { lbl: 'Mobile',     val: info.phone   },
    { lbl: 'Email',      val: info.email   },
    { lbl: 'Address',    val: info.address },
    { lbl: 'GST Number', val: info.gst     },
  ]
  let ciy = y + 50
  contactRows.forEach(row => {
    st(d, C.muted); d.setFont('helvetica', 'normal'); d.setFontSize(7.5)
    d.text(row.lbl.toUpperCase(), ML + 11, ciy); ciy += 4.5
    st(d, C.navy); d.setFont('helvetica', 'bold'); d.setFontSize(8.5)
    const vl = d.splitTextToSize(row.val, c1W - 20)
    d.text(vl, ML + 11, ciy); ciy += vl.length * 4.5 + 4
  })

  // ── RIGHT: Quick-contact cards (full-width rows with bold icons) ─────────
  const qcH = 21
  const qcItems = [
    { label: 'Call Us',   sub: 'Talk directly with our team',  val: info.phone,               clr: C.blue,         icon: 'TEL' },
    { label: 'WhatsApp',  sub: 'Message us on WhatsApp',       val: info.phone,               clr: C.green,        icon: 'WA'  },
    { label: 'Email Us',  sub: 'Send us your enquiry',         val: info.email,               clr: [2, 132, 199],   icon: '@'   },
    { label: 'Visit Us',  sub: 'Vatva, Ahmedabad, Gujarat',    val: 'Get Directions',         clr: [217, 119, 6],  icon: 'MAP' },
  ]
  qcItems.forEach((qc, i) => {
    const qy = y + i * 25
    fr(d, c2X, qy, c2W, qcH, C.bg); sr(d, c2X, qy, c2W, qcH, C.brd); fr(d, c2X, qy, 3.5, qcH, qc.clr)

    // Icon badge
    fr(d, c2X + 8, qy + 3.5, 14, 14, qc.clr)
    st(d, C.white); d.setFont('helvetica', 'bold')
    d.setFontSize(qc.icon === '@' ? 12 : (qc.icon === 'MAP' ? 8.5 : 9.5))
    d.text(qc.icon, c2X + 15, qy + (qc.icon === '@' ? 13 : 12.5), { align: 'center' })

    // Title & Subtitle
    st(d, C.navy); d.setFont('helvetica', 'bold'); d.setFontSize(10.5)
    d.text(qc.label, c2X + 26, qy + 9.5)
    st(d, C.muted); d.setFont('helvetica', 'normal'); d.setFontSize(8.5)
    d.text(qc.sub, c2X + 26, qy + 16.5)

    // Value on right side
    st(d, qc.clr); d.setFont('helvetica', 'bold'); d.setFontSize(qc.label === 'Email Us' ? 9.5 : 10)
    d.text(qc.val, c2X + c2W - 8, qy + 13, { align: 'right' })
  })

  // Business hours box
  const bhY = y + 100
  const bhH = 30
  fr(d, c2X, bhY, c2W, bhH, C.bg); sr(d, c2X, bhY, c2W, bhH, C.brd); fr(d, c2X, bhY, c2W, 3, C.blue)
  st(d, C.navy); d.setFont('helvetica', 'bold'); d.setFontSize(10.5)
  d.text('Business Hours', c2X + 9, bhY + 11.5)
  hl(d, c2X + 7, bhY + 14, c2W - 14, C.brd, 0.3)

  const hours = [
    { day: 'Monday – Saturday', time: '9:00 AM – 7:00 PM', open: true  },
    { day: 'Sunday',            time: 'By Appointment',    open: false },
  ]
  let bhy = bhY + 20.5
  hours.forEach(h => {
    st(d, C.dark); d.setFont('helvetica', 'normal'); d.setFontSize(9)
    d.text(h.day, c2X + 9, bhy)
    fr(d, c2X + c2W - 48, bhy - 5.5, 44, 8.5, h.open ? [209, 250, 229] : [254, 243, 199])
    st(d, h.open ? C.green : [180, 100, 0]); d.setFont('helvetica', 'bold'); d.setFontSize(8)
    d.text(h.time, c2X + c2W - 26, bhy, { align: 'center' })
    bhy += 7.5
  })

  y += 130 + 10

  // ── Location address block ─────────────────────────────────────────────────
  hl(d, ML, y, CW, C.brd, 0.3); y += 8
  y = sTag(d, 'OUR LOCATION', y)

  fr(d, ML, y, CW, 26, C.bg); sr(d, ML, y, CW, 26, C.brd); fr(d, ML, y, 4, 26, C.blue)
  st(d, C.navy); d.setFont('helvetica', 'bold'); d.setFontSize(11)
  d.text('NECTRA SERVICES', ML + 10, y + 10)
  st(d, C.muted); d.setFont('helvetica', 'normal'); d.setFontSize(8.5)
  d.text('35, Avadh Estate, Nr Panchratna Estate, Ramol Cross Road, Vatva, Ahmedabad – 382445, Gujarat', ML + 10, y + 17.5)
  st(d, C.blue); d.setFont('helvetica', 'bold'); d.setFontSize(8)
  d.text('GST: 24DYBPA1056C1ZA', ML + 10, y + 23.5)
  y += 31

  // Stats row
  const sw = (CW - 3 * 7) / 4
  stats.forEach((st2, i) => {
    const sx = ML + i * (sw + 7)
    fr(d, sx, y, sw, 24, C.navy); fr(d, sx, y, sw, 3, C.cyan)
    st(d, C.cyan); d.setFont('helvetica', 'bold'); d.setFontSize(16)
    d.text(st2.value, sx + sw / 2, y + 14, { align: 'center' })
    st(d, [180, 205, 225]); d.setFont('helvetica', 'normal'); d.setFontSize(7.5)
    d.text(st2.label, sx + sw / 2, y + 21, { align: 'center' })
  })
  y += 29

  // CTA strip
  fr(d, ML, y, CW, 31, C.navy); fr(d, ML, y, CW, 3, C.cyan); fr(d, ML, y, 4, 31, C.cyan)
  st(d, C.white); d.setFont('helvetica', 'bold'); d.setFontSize(15)
  d.text('Ready to Work With Us?', ML + CW / 2, y + 12, { align: 'center' })
  st(d, [180, 210, 235]); d.setFont('helvetica', 'normal'); d.setFontSize(9.5)
  d.text("Let's discuss your project  |  +91 99791 70404  |  info@nectraservices.com", ML + CW / 2, y + 21, { align: 'center' })
  st(d, C.cyan); d.setFont('helvetica', 'bold'); d.setFontSize(8.5)
  d.text('www.nectraservices.com', ML + CW / 2, y + 28, { align: 'center' })
}

// ─── BACK COVER ───────────────────────────────────────────────────────────────

async function drawBackCover(d, logoImg, pg) {
  fr(d, 0, 0, W, H, C.navy)
  fr(d, 0, 0, 4, H, C.cyan); fr(d, 4, 0, W - 4, 2, C.blue)
  // Decorative circles
  sf(d, [15, 35, 65]); d.circle(W - 28, 40, 42, 'F'); d.circle(22, H - 40, 34, 'F')
  sf(d, [4, 12, 28]);  d.circle(W - 12, H - 18, 52, 'F')

  if (logoImg) d.addImage(logoImg, 'PNG', ML + 4, 28, 24, 24)

  const cx = W / 2
  st(d, C.cyan); d.setFont('helvetica', 'bold'); d.setFontSize(8.5)
  d.text('READY TO WORK WITH US?', cx, 58, { align: 'center' })
  hl(d, cx - 32, 62, 64, C.cyan, 0.6)

  st(d, C.white); d.setFont('helvetica', 'bold'); d.setFontSize(24)
  d.text("Let's Build Something", cx, 77, { align: 'center' })
  st(d, C.cyan); d.text('Great Together', cx, 89, { align: 'center' })

  st(d, [180, 200, 225]); d.setFont('helvetica', 'normal'); d.setFontSize(10)
  d.text('Discuss your next fabrication & engineering project with us.', cx, 101, { align: 'center' })
  d.text('Precision, quality and reliability — on time, every time.', cx, 109, { align: 'center' })

  fr(d, cx - 34, 117, 68, 16, C.blue); fr(d, cx - 34, 117, 68, 3, C.cyan)
  st(d, C.white); d.setFont('helvetica', 'bold'); d.setFontSize(12)
  d.text('GET A QUOTE', cx, 127, { align: 'center' })

  hl(d, ML, 140, CW, C.blue, 0.3)
  const ctcts = [{ l: 'Phone / WhatsApp', v: '+91 99791 70404' }, { l: 'Email', v: 'info@nectraservices.com' }, { l: 'Website', v: 'www.nectraservices.com' }]
  const cw3 = (CW - 2 * 7) / 3
  ctcts.forEach((co, i) => {
    const bx = ML + i * (cw3 + 7)
    fr(d, bx, 144, cw3, 25, [15, 35, 65]); fr(d, bx, 144, cw3, 2.5, C.cyan)
    st(d, C.cyan); d.setFont('helvetica', 'bold'); d.setFontSize(8)
    d.text(co.l, bx + cw3 / 2, 152, { align: 'center' })
    st(d, C.white); d.setFont('helvetica', 'normal'); d.setFontSize(8.5)
    d.text(co.v, bx + cw3 / 2, 161, { align: 'center' })
  })

  hl(d, ML, 176, CW, [30, 50, 80], 0.3)
  st(d, [160, 185, 210]); d.setFont('helvetica', 'bold'); d.setFontSize(8.5)
  d.text('Address', cx, 184, { align: 'center' })
  st(d, [200, 215, 230]); d.setFont('helvetica', 'normal'); d.setFontSize(9)
  d.text('35, Avadh Estate, Nr Panchratna Estate, Ramol Cross Road,', cx, 192, { align: 'center' })
  d.text('Vatva, Ahmedabad - 382445, Gujarat, India', cx, 200, { align: 'center' })
  st(d, [140, 165, 195]); d.setFont('helvetica', 'bold'); d.setFontSize(7.5)
  d.text('GST No: 24DYBPA1056C1ZA', cx, 208, { align: 'center' })

  hl(d, ML, 215, CW, C.blue, 0.3)
  st(d, C.white); d.setFont('helvetica', 'bold'); d.setFontSize(25)
  d.text('NECTRA SERVICES', cx, 232, { align: 'center' })
  st(d, C.cyan); d.setFont('helvetica', 'normal'); d.setFontSize(9.5)
  d.text('MS & SS FABRICATION SPECIALIST', cx, 241, { align: 'center' })
  st(d, [160, 185, 215]); d.setFontSize(9)
  d.text('Precision  |  Quality  |  Timely Delivery  |  Customer Satisfaction', cx, 250, { align: 'center' })

  const sy = 259; const sw2 = (CW - 3 * 8) / 4
  stats.forEach((st2, i) => {
    const sx = ML + i * (sw2 + 8)
    fr(d, sx, sy, sw2, 21, [15, 35, 65]); fr(d, sx, sy, sw2, 2.5, C.cyan)
    st(d, C.cyan); d.setFont('helvetica', 'bold'); d.setFontSize(14)
    d.text(st2.value, sx + sw2 / 2, sy + 12, { align: 'center' })
    st(d, [200, 215, 230]); d.setFont('helvetica', 'normal'); d.setFontSize(7)
    d.text(st2.label, sx + sw2 / 2, sy + 18.5, { align: 'center' })
  })

  fr(d, 0, H - 13, W, 13, [4, 12, 28]); hl(d, 0, H - 13, W, C.cyan, 0.4)
  st(d, [120, 145, 175]); d.setFont('helvetica', 'normal'); d.setFontSize(7.5)
  d.text('(c) 2024 NECTRA SERVICES. All rights reserved.  |  Ahmedabad, Gujarat, India', cx, H - 5, { align: 'center' })
}

// ─── MAIN EXPORT ─────────────────────────────────────────────────────────────

export async function generateCompanyProfilePDF(onProgress) {
  try {
    onProgress?.('Loading images...', 5)

    const [heroImg, factoryImg1, factoryImg2, factoryImg3, logoImg, ...prodImgs] = await Promise.all([
      loadImg('/images/hero-welder.png'),
      loadImg('/images/factory-exterior.jpg'),
      loadImg('/images/factory-interior-1.jpg'),
      loadImg('/images/factory-interior-2.jpg'),
      loadImg('/images/nectra-logo-mark.png'),
      ...products.map(p => loadImg(p.image)),
    ])

    const productImages = {}
    products.forEach((p, i) => { productImages[p.id] = prodImgs[i] })

    const doc = new jsPDF({ unit: 'mm', format: 'a4', compress: true })

    // Page 1 — Cover
    onProgress?.('Building cover page...', 10)
    await drawCover(doc, heroImg, logoImg)

    // Page 2 — About Part 1 (Company overview + Factory)
    onProgress?.('Building About Us Part 1...', 18)
    doc.addPage()
    await drawAboutPart1(doc, factoryImg2, factoryImg3, logoImg, 2)

    // Page 3 — About Part 2 (Why Choose Us + Mission & Vision)
    onProgress?.('Building About Us Part 2...', 26)
    doc.addPage()
    await drawAboutPart2(doc, 3)

    // Page 4 — Services + Industries
    onProgress?.('Building Services page...', 34)
    doc.addPage()
    await drawServices(doc, 4)

    // Pages 5–11 — One page per product
    for (let i = 0; i < products.length; i++) {
      const pct = 34 + Math.round(((i + 1) / products.length) * 42)
      onProgress?.(`Building product: ${products[i].name}...`, pct)
      doc.addPage()
      await drawProductPage(doc, products[i], productImages[products[i].id], 5 + i)
    }

    // Page 12 — Contact Us
    const contactPg = 5 + products.length   // = 12
    onProgress?.('Building Contact Us page...', 82)
    doc.addPage()
    await drawContact(doc, logoImg, contactPg)

    // Page 13 — Back Cover
    onProgress?.('Building back cover...', 92)
    doc.addPage()
    await drawBackCover(doc, logoImg, contactPg + 1)

    onProgress?.('Saving PDF...', 97)
    doc.save('Nectra_Services_Company_Profile.pdf')
    onProgress?.('Done!', 100)
    return true
  } catch (err) {
    console.error('PDF generation failed:', err)
    throw err
  }
}
