// Site navigation shared by the header menus and the footer site map.
// Works are grouped by topic; a group's optional `overview` is its landing page.
export const works = [
  {
    title: 'Robotics',
    items: [
      { label: 'Hexapod Link', href: '/2025/10/22/hexapod-link/' },
      { label: 'Hexapod', href: '/2024/09/12/hexapod/' },
      { label: 'Arcade Remote', href: '/2023/03/18/remote-arcade/' },
      { label: 'Smarty', href: '/2023/01/18/smarty/' },
    ],
  },
  {
    title: 'Engineering Software',
    items: [
      { label: 'SensorView', href: '/2020/11/11/sensorview/' },
      { label: 'BeamScope', href: '/2019/02/11/beamscope/' },
      { label: 'Tx-Line Calculator', href: '/2018/05/01/tx-line-calculator/' },
      { label: 'CommProbe', href: '/2017/07/04/commprobe/' },
    ],
  },
  {
    title: 'Research',
    overview: { label: 'Research Projects', href: '/research-projects/' },
    items: [
      { label: 'Portable 24-GHz 3D MIMO Radar', href: '/2017/09/27/portable-24-ghz-3d-mimo-radar/' },
      { label: 'K-Band 2D RF Beamforming FMCW Radar', href: '/2017/01/28/k-band-2d-rf-beamforming-fmcw-radar/' },
      { label: 'K-Band Portable Multi-Mode Radar', href: '/2017/01/28/k-band-portable-multi-mode-radar/' },
      { label: 'C-Band Portable Multi-Mode Radar', href: '/2017/01/28/c-band-portable-multi-mode-radar/' },
      { label: '24-GHz Radar-on-Chip', href: '/2017/01/28/24-ghz-radar-on-chip/' },
      { label: 'Adaptive Beamforming Array', href: '/2017/01/21/adaptive-beamforming-array/' },
      { label: 'Ku-Band High-Gain Horn Antenna Array', href: '/2017/01/27/ku-band-high-gain-horn-antenna-array/' },
      { label: 'Wideband RF Signal Synthesizer', href: '/2017/01/18/wideband-rf-signal-synthesizer/' },
    ],
  },
];

export const publications = [
  { label: 'Book', href: '/publications/#book' },
  { label: 'Book Chapters', href: '/publications/#book-chapters' },
  { label: 'Journals', href: '/publications/#journals' },
  { label: 'Conferences', href: '/publications/#conferences' },
  { label: 'Patents', href: '/publications/#patents' },
];

export const elsewhere = [
  { label: 'GitHub', href: 'https://github.com/rookiepeng', icon: 'fa-brands fa-github' },
  { label: 'Google Scholar', href: 'https://scholar.google.com/citations?user=0vQPboMAAAAJ', icon: 'fa-brands fa-google-scholar' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/zhengyup', icon: 'fa-brands fa-linkedin-in' },
  { label: 'RSS feed', href: '/feed.xml', icon: 'fa-solid fa-rss' },
];
