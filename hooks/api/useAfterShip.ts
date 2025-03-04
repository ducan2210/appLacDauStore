import axios from 'axios';

// Danh sách slug của các hãng vận chuyển tại Việt Nam
const VIETNAM_COURIERS = [
  'vnpost', // Vietnam Post
  'viettelpost', // Viettel Post
  'ghn', // GHN
  'ghtk', // Giao Hàng Tiết Kiệm
  'kerryttc-vn', // Kerry Express Vietnam
  'jtexpress-vn', // J&T Express Vietnam
  'ahamove', // AhaMove
  'ninjavan-vn', // Ninja Van Vietnam
  'dhl', // DHL Express
  'fedex', // FedEx
  'ups', // UPS
];

export type typeCouriers = {
  slug: string;
  name: string;
};

// Hàm lấy danh sách các hãng vận chuyển từ AfterShip, chỉ giữ lại các hãng ở Việt Nam
export const getAllCouriers = async (): Promise<typeCouriers[]> => {
  try {
    const response = await axios.get(
      'https://api.aftership.com/v4/couriers/all',
      {
        headers: {
          'Content-Type': 'application/json',
          'as-api-key': 'asat_9002ca092d90467fa827d9ff2de0f864',
        },
      },
    );

    // Lọc chỉ các hãng vận chuyển tại Việt Nam
    const vietnamCouriers = response.data.data.couriers.filter(
      (courier: typeCouriers) => VIETNAM_COURIERS.includes(courier.slug),
    );
    return vietnamCouriers;
  } catch (error) {
    return [
      {slug: 'vietnam-post', name: 'Vietnam Post'},
      {slug: 'viettel-post', name: 'Viettel Post'},
      {slug: 'ghn', name: 'GHN'},
      {slug: 'ghtk', name: 'Giao Hàng Tiết Kiệm'},
      {slug: 'kerry-express-vn', name: 'Kerry Express Vietnam'},
    ];
  }
};
