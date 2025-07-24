// export const formatPrice = (price) => {
//   const userLocale = navigator.language || 'en-US'; // اللغة حسب المتصفح
//   const currencyByLocale = {
//     'en-US': 'USD',
//     'en-GB': 'GBP',
//     'fr-FR': 'EUR',
//     // أضف أي مناطق عملة أخرى تحتاجها
//   };

//   const currency = currencyByLocale[userLocale] || 'USD';

//   return new Intl.NumberFormat(userLocale, {
//     style: 'currency',
//     currency: currency,
//     minimumFractionDigits: 2,
//   }).format(price);
// }

export const formatPrice = (price) => {
  // نعرض الدولار الأمريكي فقط بغض النظر عن اللغة
  const currency = 'USD';  // هنا حددنا الدولار الأمريكي فقط
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
  }).format(price);
};



































