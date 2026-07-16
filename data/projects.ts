export type MediaItem =
  | { type: 'photo'; src: string; alt?: string }
  | { type: 'video'; videoId: string }

export type Project = {
  id:           string
  slug:         string
  title:        string
  type:         string
  neighbourhood:string
  description:  string
  photos:       string[]       // array of photo URLs — first photo is the thumbnail
  completedDate:string
  featured:     boolean
  videoId?:     string         // optional Vimeo video ID
  mediaOrder?:  MediaItem[]    // custom display order on project page — mix photos & video however you want
}

/** Helper: get the thumbnail for a project (first photo, or placeholder) */
export function getProjectThumbnail(project: Project): string {
  return project.photos[0] ?? 'https://picsum.photos/seed/placeholder/800/600'
}

export const projects: Project[] = [
  {
    id:'1', slug:'nepean-full-property', title:'Nepean Full Property Transformation', type:'Full Property (front + back)', neighbourhood:'Nepean',
    description:'Complete front-to-back property transformation: interlock driveway, natural stone steps, garden pathway, backyard seating patio, and custom shed. Every surface engineered for Ottawa winters.',
    photos: [
      'https://res.cloudinary.com/lbsy6tsd/image/upload/q_auto,f_auto,w_800/v1784066126/1_bjnv7h.jpg',
      'https://res.cloudinary.com/lbsy6tsd/image/upload/q_auto,f_auto,w_800/v1784066126/2_syzioy.jpg',
      'https://res.cloudinary.com/lbsy6tsd/image/upload/q_auto,f_auto,w_800/v1784066126/3_ywslwn.jpg',
      'https://res.cloudinary.com/lbsy6tsd/image/upload/q_auto,f_auto,w_800/v1784066126/4_rctwe0.jpg',
      'https://res.cloudinary.com/lbsy6tsd/image/upload/q_auto,f_auto,w_800/v1784066127/5_enzhlw.jpg',
      'https://res.cloudinary.com/lbsy6tsd/image/upload/q_auto,f_auto,w_800/v1784066126/6_lsuhxd.jpg',
      'https://res.cloudinary.com/lbsy6tsd/image/upload/q_auto,f_auto,w_800/v1784066128/7_n9y53f.jpg',
      'https://res.cloudinary.com/lbsy6tsd/image/upload/q_auto,f_auto,w_800/v1784066125/8_crrqb6.jpg',
      'https://res.cloudinary.com/lbsy6tsd/image/upload/q_auto,f_auto,w_800/v1784066127/9_kmyf07.jpg',
      'https://res.cloudinary.com/lbsy6tsd/image/upload/q_auto,f_auto,w_800/v1784066127/10_ppotiw.jpg',
      'https://res.cloudinary.com/lbsy6tsd/image/upload/q_auto,f_auto,w_800/v1784066125/11_lffse6.jpg',
      'https://res.cloudinary.com/lbsy6tsd/image/upload/q_auto,f_auto,w_800/v1784066128/12_asi28q.jpg',
    ],
    completedDate:'Summer 2024', featured:true,
    mediaOrder: [
      { type:'photo', src:'https://res.cloudinary.com/lbsy6tsd/image/upload/q_auto,f_auto,w_1200/v1784066126/1_bjnv7h.jpg', alt:'Nepean project overview' },
      { type:'photo', src:'https://res.cloudinary.com/lbsy6tsd/image/upload/q_auto,f_auto,w_1200/v1784066126/2_syzioy.jpg', alt:'Driveway detail' },
      { type:'photo', src:'https://res.cloudinary.com/lbsy6tsd/image/upload/q_auto,f_auto,w_1200/v1784066126/3_ywslwn.jpg', alt:'Stone steps' },
      { type:'photo', src:'https://res.cloudinary.com/lbsy6tsd/image/upload/q_auto,f_auto,w_1200/v1784066126/4_rctwe0.jpg', alt:'Garden pathway' },
      { type:'photo', src:'https://res.cloudinary.com/lbsy6tsd/image/upload/q_auto,f_auto,w_1200/v1784066127/5_enzhlw.jpg', alt:'Backyard patio' },
      { type:'photo', src:'https://res.cloudinary.com/lbsy6tsd/image/upload/q_auto,f_auto,w_1200/v1784066126/6_lsuhxd.jpg', alt:'Patio seating area' },
      { type:'photo', src:'https://res.cloudinary.com/lbsy6tsd/image/upload/q_auto,f_auto,w_1200/v1784066128/7_n9y53f.jpg', alt:'Shed installation' },
      { type:'photo', src:'https://res.cloudinary.com/lbsy6tsd/image/upload/q_auto,f_auto,w_1200/v1784066125/8_crrqb6.jpg', alt:'Front yard view' },
      { type:'photo', src:'https://res.cloudinary.com/lbsy6tsd/image/upload/q_auto,f_auto,w_1200/v1784066127/9_kmyf07.jpg', alt:'Side walkway' },
      { type:'photo', src:'https://res.cloudinary.com/lbsy6tsd/image/upload/q_auto,f_auto,w_1200/v1784066127/10_ppotiw.jpg', alt:'Backyard transformation' },
      { type:'photo', src:'https://res.cloudinary.com/lbsy6tsd/image/upload/q_auto,f_auto,w_1200/v1784066125/11_lffse6.jpg', alt:'Completed project' },
      { type:'photo', src:'https://res.cloudinary.com/lbsy6tsd/image/upload/q_auto,f_auto,w_1200/v1784066128/12_asi28q.jpg', alt:'Final finish detail' },
    ],
  },
  {
    id:'2', slug:'orleans-interlock-driveway', title:'Orléans Interlock Driveway', type:'Interlock Driveway', neighbourhood:'Orléans',
    description:'Premium interlock driveway and paving stone installation with precision grading and engineered base. Built to endure Ottawa\'s freeze-thaw cycles.',
    photos: [
      'https://res.cloudinary.com/lbsy6tsd/image/upload/q_auto,f_auto,w_800/v1784070493/1_bgxv5f.jpg',
      'https://res.cloudinary.com/lbsy6tsd/image/upload/q_auto,f_auto,w_800/v1784070487/2_kntxg7.jpg',
      'https://res.cloudinary.com/lbsy6tsd/image/upload/q_auto,f_auto,w_800/v1784070488/3_hejvhp.jpg',
      'https://res.cloudinary.com/lbsy6tsd/image/upload/q_auto,f_auto,w_800/v1784070489/4_dyzywn.jpg',
      'https://res.cloudinary.com/lbsy6tsd/image/upload/q_auto,f_auto,w_800/v1784070490/5_x5doqd.jpg',
      'https://res.cloudinary.com/lbsy6tsd/image/upload/q_auto,f_auto,w_800/v1784070491/6_oli71x.jpg',
      'https://res.cloudinary.com/lbsy6tsd/image/upload/q_auto,f_auto,w_800/v1784070492/7_phirgd.jpg',
    ],
    completedDate:'Summer 2025', featured:true,
    mediaOrder: [
      { type:'photo', src:'https://res.cloudinary.com/lbsy6tsd/image/upload/q_auto,f_auto,w_1200/v1784070493/1_bgxv5f.jpg', alt:'Driveway overview' },
      { type:'photo', src:'https://res.cloudinary.com/lbsy6tsd/image/upload/q_auto,f_auto,w_1200/v1784070487/2_kntxg7.jpg', alt:'Paving stone detail' },
      { type:'photo', src:'https://res.cloudinary.com/lbsy6tsd/image/upload/q_auto,f_auto,w_1200/v1784070488/3_hejvhp.jpg', alt:'Interlock pattern' },
      { type:'photo', src:'https://res.cloudinary.com/lbsy6tsd/image/upload/q_auto,f_auto,w_1200/v1784070489/4_dyzywn.jpg', alt:'Edge restraint finish' },
      { type:'photo', src:'https://res.cloudinary.com/lbsy6tsd/image/upload/q_auto,f_auto,w_1200/v1784070490/5_x5doqd.jpg', alt:'Front view' },
      { type:'photo', src:'https://res.cloudinary.com/lbsy6tsd/image/upload/q_auto,f_auto,w_1200/v1784070491/6_oli71x.jpg', alt:'Side angle' },
      { type:'photo', src:'https://res.cloudinary.com/lbsy6tsd/image/upload/q_auto,f_auto,w_1200/v1784070492/7_phirgd.jpg', alt:'Completed driveway' },
    ],
  },
  {
    id:'3', slug:'ottawa-hardscape-showcase', title:'Ottawa Hardscape Showcase — More of Our Work', type:'Mixed Hardscape', neighbourhood:'Ottawa & Surrounding Area',
    description:'A snapshot of the variety of hardscape work we do across Ottawa and surrounding neighbourhoods — natural stone pathways, front entrance landings, backyard patios with seating walls, pool decks, retaining walls, and interlock driveways. Same OttStone standard on every single job.',
    photos: [
      'https://res.cloudinary.com/lbsy6tsd/image/upload/q_auto,f_auto,w_800/v1784072405/1_jz9bp2.jpg',
      'https://res.cloudinary.com/lbsy6tsd/image/upload/q_auto,f_auto,w_800/v1784072408/2_jbggrw.jpg',
      'https://res.cloudinary.com/lbsy6tsd/image/upload/q_auto,f_auto,w_800/v1784072417/3_kfafel.jpg',
      'https://res.cloudinary.com/lbsy6tsd/image/upload/q_auto,f_auto,w_800/v1784072398/4_mnffqt.jpg',
      'https://res.cloudinary.com/lbsy6tsd/image/upload/q_auto,f_auto,w_800/v1784072404/5_c5g8mt.jpg',
      'https://res.cloudinary.com/lbsy6tsd/image/upload/q_auto,f_auto,w_800/v1784072409/6_hmbbas.jpg',
      'https://res.cloudinary.com/lbsy6tsd/image/upload/q_auto,f_auto,w_800/v1784072410/7_bz99ow.jpg',
      'https://res.cloudinary.com/lbsy6tsd/image/upload/q_auto,f_auto,w_800/v1784072411/8_nncw2q.jpg',
      'https://res.cloudinary.com/lbsy6tsd/image/upload/q_auto,f_auto,w_800/v1784072412/9_llqbym.jpg',
      'https://res.cloudinary.com/lbsy6tsd/image/upload/q_auto,f_auto,w_800/v1784072413/10_faa5zo.jpg',
      'https://res.cloudinary.com/lbsy6tsd/image/upload/q_auto,f_auto,w_800/v1784072414/11_yxol3k.jpg',
      'https://res.cloudinary.com/lbsy6tsd/image/upload/q_auto,f_auto,w_800/v1784072417/12_ucqyqf.jpg',
      'https://res.cloudinary.com/lbsy6tsd/image/upload/q_auto,f_auto,w_800/v1784072417/13_zyb2yi.jpg',
      'https://res.cloudinary.com/lbsy6tsd/image/upload/q_auto,f_auto,w_800/v1784072419/14_owiesz.jpg',
      'https://res.cloudinary.com/lbsy6tsd/image/upload/q_auto,f_auto,w_800/v1784072420/15_vbdvu2.jpg',
      'https://res.cloudinary.com/lbsy6tsd/image/upload/q_auto,f_auto,w_800/v1784072421/16_r6549l.jpg',
      'https://res.cloudinary.com/lbsy6tsd/image/upload/q_auto,f_auto,w_800/v1784072423/17_wfjbmt.jpg',
      'https://res.cloudinary.com/lbsy6tsd/image/upload/q_auto,f_auto,w_800/v1784072426/18_kfa4uu.jpg',
      'https://res.cloudinary.com/lbsy6tsd/image/upload/q_auto,f_auto,w_800/v1784072427/19_agroov.jpg',
    ],
    completedDate:'Various 2020–2026', featured:true,
    mediaOrder: [
      { type:'photo', src:'https://res.cloudinary.com/lbsy6tsd/image/upload/q_auto,f_auto,w_1200/v1784072405/1_jz9bp2.jpg', alt:'Natural stone garden pathway with gravel borders' },
      { type:'photo', src:'https://res.cloudinary.com/lbsy6tsd/image/upload/q_auto,f_auto,w_1200/v1784072408/2_jbggrw.jpg', alt:'Side yard stone walkway between houses' },
      { type:'photo', src:'https://res.cloudinary.com/lbsy6tsd/image/upload/q_auto,f_auto,w_1200/v1784072417/3_kfafel.jpg', alt:'Front entrance interlock landing with natural stone steps' },
      { type:'photo', src:'https://res.cloudinary.com/lbsy6tsd/image/upload/q_auto,f_auto,w_1200/v1784072398/4_mnffqt.jpg', alt:'Pool deck with interlock surround, pergola and drainage channel' },
      { type:'photo', src:'https://res.cloudinary.com/lbsy6tsd/image/upload/q_auto,f_auto,w_1200/v1784072404/5_c5g8mt.jpg', alt:'Backyard patio and garden feature' },
      { type:'photo', src:'https://res.cloudinary.com/lbsy6tsd/image/upload/q_auto,f_auto,w_1200/v1784072409/6_hmbbas.jpg', alt:'Curved backyard patio with natural stone seating wall' },
      { type:'photo', src:'https://res.cloudinary.com/lbsy6tsd/image/upload/q_auto,f_auto,w_1200/v1784072410/7_bz99ow.jpg', alt:'Interlock patio and outdoor living area' },
      { type:'photo', src:'https://res.cloudinary.com/lbsy6tsd/image/upload/q_auto,f_auto,w_1200/v1784072411/8_nncw2q.jpg', alt:'Retaining wall installation beside driveway' },
      { type:'photo', src:'https://res.cloudinary.com/lbsy6tsd/image/upload/q_auto,f_auto,w_1200/v1784072412/9_llqbym.jpg', alt:'Stone walkway and patio detail' },
      { type:'photo', src:'https://res.cloudinary.com/lbsy6tsd/image/upload/q_auto,f_auto,w_1200/v1784072413/10_faa5zo.jpg', alt:'Charcoal interlock patio with pergola posts' },
      { type:'photo', src:'https://res.cloudinary.com/lbsy6tsd/image/upload/q_auto,f_auto,w_1200/v1784072414/11_yxol3k.jpg', alt:'Natural stone front entrance steps and landing' },
      { type:'photo', src:'https://res.cloudinary.com/lbsy6tsd/image/upload/q_auto,f_auto,w_1200/v1784072417/12_ucqyqf.jpg', alt:'Interlock driveway base preparation and staging' },
      { type:'photo', src:'https://res.cloudinary.com/lbsy6tsd/image/upload/q_auto,f_auto,w_1200/v1784072417/13_zyb2yi.jpg', alt:'Stone steps and front entrance makeover' },
      { type:'photo', src:'https://res.cloudinary.com/lbsy6tsd/image/upload/q_auto,f_auto,w_1200/v1784072419/14_owiesz.jpg', alt:'Interlock pathway and garden border' },
      { type:'photo', src:'https://res.cloudinary.com/lbsy6tsd/image/upload/q_auto,f_auto,w_1200/v1784072420/15_vbdvu2.jpg', alt:'Backyard hardscape transformation' },
      { type:'photo', src:'https://res.cloudinary.com/lbsy6tsd/image/upload/q_auto,f_auto,w_1200/v1784072421/16_r6549l.jpg', alt:'Driveway and front yard interlock detail' },
      { type:'photo', src:'https://res.cloudinary.com/lbsy6tsd/image/upload/q_auto,f_auto,w_1200/v1784072423/17_wfjbmt.jpg', alt:'Natural stone retaining wall and landscaping' },
      { type:'photo', src:'https://res.cloudinary.com/lbsy6tsd/image/upload/q_auto,f_auto,w_1200/v1784072426/18_kfa4uu.jpg', alt:'Completed interlock and stone project' },
      { type:'photo', src:'https://res.cloudinary.com/lbsy6tsd/image/upload/q_auto,f_auto,w_1200/v1784072427/19_agroov.jpg', alt:'Finished hardscape — curb appeal transformation' },
    ],
  },
]
