export const siteImages = {
  logo:
    "https://cdn.builder.io/api/v1/image/assets%2F612e9a82b86748da836eaf9bc77dd81e%2F4e42fd0353e140c7b4e2963d14193c78?format=webp&width=800",
  footerLogo:
    "https://cdn.builder.io/api/v1/image/assets%2F989f85e0810540beb17869a1dc94573c%2F97cc268de76d436394018f38ffb855c1?format=webp&width=800",
  heroSlides: [
    "https://cdn.builder.io/api/v1/image/assets%2F612e9a82b86748da836eaf9bc77dd81e%2F6772b371f4814bc98b2cf668c8b63c85?format=webp&width=800",
    "https://cdn.builder.io/api/v1/image/assets%2F612e9a82b86748da836eaf9bc77dd81e%2F7f76d15846714e82b37da415ec914a8f?format=webp&width=800",
    "https://cdn.builder.io/api/v1/image/assets%2F612e9a82b86748da836eaf9bc77dd81e%2F4722d5d1ce014a308bb79a3a758dd8ac?format=webp&width=800",
    "https://cdn.builder.io/api/v1/image/assets%2F612e9a82b86748da836eaf9bc77dd81e%2F00108060be0b49f38e94860468ddbfef?format=webp&width=800",
  ],
  aboutBackground:
    "https://static.wixstatic.com/media/c837a6_2119733e838e4a2f8813ebde736f99d5~mv2.jpg/v1/fill/w_1901,h_1625,al_b,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/c837a6_2119733e838e4a2f8813ebde736f99d5~mv2.jpg?format=webp&width=800",
  aboutCard:
    "https://static.wixstatic.com/media/c837a6_eb322a4179e54d788eef6896e67f05d0~mv2.jpg/v1/fill/w_828,h_1338,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/c837a6_eb322a4179e54d788eef6896e67f05d0~mv2.jpg",
  studentDevelopment:
    "https://static.wixstatic.com/media/c837a6_41aece62e57346379d12018aece18ea2~mv2.jpg/v1/fill/w_860,h_1310,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/c837a6_41aece62e57346379d12018aece18ea2~mv2.jpg",
  statistics:
    "https://static.wixstatic.com/media/c837a6_d11c6c437c0f4feb9de8591b42ead168~mv2.jpg/v1/fill/w_2281,h_1119,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/c837a6_d11c6c437c0f4feb9de8591b42ead168~mv2.jpg",
  joinCta:
    "https://static.wixstatic.com/media/c837a6_0f9a4576e86442e3b124952322acdd72~mv2.jpg/v1/fill/w_1188,h_1004,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/c837a6_0f9a4576e86442e3b124952322acdd72~mv2.jpg",
  pageHero:
    "https://static.wixstatic.com/media/c837a6_3f53cdbff83b47b19a97bd35c767333c~mv2.jpg/v1/fill/w_1901,h_913,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/c837a6_3f53cdbff83b47b19a97bd35c767333c~mv2.jpg",
  aboutVision:
    "https://static.wixstatic.com/media/c837a6_a56caf65f5424508937c5d7a4ced1619~mv2.jpg/v1/fill/w_828,h_788,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/c837a6_a56caf65f5424508937c5d7a4ced1619~mv2.jpg",
  leadership:
    "https://static.wixstatic.com/media/c837a6_e166632dd5264456b9b5beba3bd949dd~mv2.jpg/v1/fill/w_828,h_788,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/c837a6_e166632dd5264456b9b5beba3bd949dd~mv2.jpg",
  empowerment:
    "https://static.wixstatic.com/media/c837a6_41007e02b626433b850e5cfc4f2fb91d~mv2.jpg/v1/fill/w_828,h_585,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/c837a6_41007e02b626433b850e5cfc4f2fb91d~mv2.jpg",
};

const contentImages = [
  siteImages.aboutVision,
  siteImages.leadership,
  siteImages.empowerment,
  siteImages.aboutBackground,
  siteImages.studentDevelopment,
  siteImages.statistics,
  siteImages.joinCta,
  siteImages.pageHero,
];

export function contentImage(index: number): string {
  return contentImages[index % contentImages.length];
}

export function handleImageError(
  event: React.SyntheticEvent<HTMLImageElement>,
): void {
  const image = event.currentTarget;
  image.onerror = null;
  image.src = siteImages.aboutVision;
}
