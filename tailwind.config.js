module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        "chinese": [
          "Helvetica Neue",
          "Helvetica",
          "Arial",
          "Microsoft Yahei",
          "Hiragino Sans GB",
          "Heiti SC",
          "WenQuanYi Micro Hei",
          "sans-serif",
        ],
        // 黑体
        "blackFont": [
          "-apple-system",
          "Noto Sans",
          "Helvetica Neue",
          "Helvetica",
          "Nimbus Sans L",
          "Arial",
          "Liberation Sans",
          "PingFang SC",
          "Hiragino Sans GB",
          "Noto Sans CJK SC",
          "Source Han Sans SC",
          "Source Han Sans CN",
          "Microsoft YaHei",
          "Wenquanyi Micro Hei",
          "WenQuanYi Zen Hei",
          "ST Heiti",
          "SimHei",
          "WenQuanYi Zen Hei Sharp",
          "sans-serif",
        ],
        // 楷体
        "kai": [
          "Baskerville",
          "Georgia",
          "Liberation Serif",
          "Kaiti SC",
          "STKaiti",
          "AR PL UKai CN",
          "AR PL UKai HK",
          "AR PL UKai TW",
          "AR PL UKai TW MBE",
          "AR PL KaitiM GB",
          "KaiTi",
          "KaiTi_GB2312",
          "DFKai-SB",
          "TW-Kai",
          "serif",
        ],
        // 宋体
        "song": [
          "Georgia",
          "Nimbus Roman No9 L",
          "Songti SC",
          "Noto Serif CJK SC",
          "Source Han Serif SC",
          "Source Han Serif CN",
          "STSong",
          "AR PL New Sung",
          "AR PL SungtiL GB",
          "NSimSun",
          "SimSun",
          "TW-Sung",
          "WenQuanYi Bitmap Song",
          "AR PL UMing CN",
          "AR PL UMing HK",
          "AR PL UMing TW",
          "AR PL UMing TW MBE",
          "PMingLiU",
          "MingLiU",
          "serif",
        ],
        // 仿宋体
        "fang-song": [
          "Baskerville",
          "Times New Roman",
          "Liberation Serif",
          "STFangsong",
          "FangSong",
          "FangSong_GB2312",
          "CWTEX-F",
          "serif",
        ],
      },
    },
  },
  plugins: [
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/line-clamp"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("daisyui"),
  ],
  // daisyUI config (optional)
  daisyui: {
    styled: true,
    themes: false,
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: "",
    darkTheme: "light",
  },
};
