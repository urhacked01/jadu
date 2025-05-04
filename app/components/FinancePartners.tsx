'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

const FINANCE_PARTNERS = [
  {
    name: 'Bajaj Auto Finance',
    logo: 'https://www.eqimg.com/images/2024/09022024-image7-equitymaster.jpg',
  },
  {
    name: 'HDFC Bank',
    logo: 'https://i.pinimg.com/736x/1e/b4/93/1eb49385575175ab7f541d7000273a1b.jpg',
  },
  {
    name: 'ICICI Bank',
    logo: 'https://static.vecteezy.com/system/resources/previews/020/336/263/non_2x/icici-logo-icici-icon-free-free-vector.jpg',
  },
  {
    name: 'Hero FinCorp',
    logo: 'https://www.unlistedarena.com/wp-content/uploads/2023/10/Hero_FinCorp_Logo_New_Final_2013_Vertical_Wiki.png',
  },
  {
    name: 'Cholamandalam Finance',
    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdZimu6HXYkMDS_95Xax9Cqzcngdk02NQCmA&s',
  },
  {
    name: 'Shriram City Union Finance',
    logo: 'https://images.jdmagicbox.com/v2/comp/aurangabad-maharashtra/v9/9999px240.x240.170316132344.j5v9/catalogue/shriram-city-union-finance-waluj-midc-aurangabad-maharashtra-personal-loans-x5xyh78uu5.jpg',
  },
  {
    name: 'L&T Finance',
    logo: 'https://content.jdmagicbox.com/v2/comp/aurangabad-maharashtra/k2/9999px240.x240.181211112516.m8k2/catalogue/l-and-t-finance-ltd-kannad-aurangabad-aurangabad-maharashtra-finance-companies-86pri675zz.jpg',
  },
  {
    name: 'IndusInd Bank',
    logo: 'https://yt3.googleusercontent.com/ytc/AIdro_lrGegp6ZaJYoTk_fCeOgguHPZtuGQnV7d1nc4j1RqxtuA=s900-c-k-c0x00ffffff-no-rj',
  },
  {
    name: 'IDFC FIRST Bank',
    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8zAbKhIggRs8aVN2TWlP-nF38Jlm78p9KOA&s',
  },
  {
    name: 'Kotak Mahindra Bank',
    logo: 'https://www.eqimg.com/images/2024/1920x1080/10212024-image3-equitymaster.jpg',
  },
];

export default function FinancePartners() {
  return (
    <div className="bg-gray-100 py-16">
      <div className="container-custom">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">Our Finance Partners</h2>
        <div className="flex flex-wrap justify-center items-stretch">
          {FINANCE_PARTNERS.map((partner, index) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 p-4"
            >
              <div className="h-full flex flex-col items-center justify-between bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6">
                <div className="relative w-full h-20 mb-4">
                  <Image
                    src={partner.logo}
                    alt={`${partner.name} logo`}
                    fill
                    style={{ objectFit: 'contain' }}
                    unoptimized
                  />
                </div>
                <p className="text-sm font-medium text-gray-700 text-center">{partner.name}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
