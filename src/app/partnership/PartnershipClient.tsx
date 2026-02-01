'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Container from '@/components/ui/Container';

import Button from '@/components/ui/Button';
import {
  Store,
  TrendingUp,
  Users,
  Award,
  MapPin,
  DollarSign,
  CheckCircle,
  X,
  Mail,
  Phone,
  User,
  Building,
  Wallet,
  FileText,
  Target,
  Handshake,
  Rocket,
  Shield,
  Clock,
} from 'lucide-react';

const STATS = [
  { icon: <Store size={32} />, value: '12+', label: 'Aktif Şube' },
  { icon: <MapPin size={32} />, value: '5', label: 'Şehir' },
  { icon: <Users size={32} />, value: '15K+', label: 'Mutlu Müşteri' },
  { icon: <Award size={32} />, value: '98%', label: 'Memnuniyet Oranı' },
];

const BENEFITS = [
  {
    icon: <Handshake size={28} />,
    title: 'Güçlü Marka',
    description: 'Yerleşik bir marka ile güvenle işe başlayın.',
  },
  {
    icon: <Target size={28} />,
    title: 'Kanıtlanmış Model',
    description: 'Test edilmiş ve başarılı iş modeli.',
  },
  {
    icon: <Shield size={28} />,
    title: 'Sürekli Destek',
    description: 'Operasyon, pazarlama ve eğitim desteği.',
  },
  {
    icon: <TrendingUp size={28} />,
    title: 'Yüksek Karlılık',
    description: 'Rekabetçi fiyatlar ve yüksek kar marjı.',
  },
  {
    icon: <Rocket size={28} />,
    title: 'Hızlı Başlangıç',
    description: '3-6 ay içinde şubenizi açın.',
  },
  {
    icon: <Users size={28} />,
    title: 'Eğitim Programı',
    description: 'Ekibiniz için kapsamlı eğitim.',
  },
];

const REQUIREMENTS = [
  {
    title: 'Yatırım Miktarı',
    value: '₺2.5M - ₺4M',
    icon: <DollarSign size={24} />,
  },
  {
    title: 'Mekan Büyüklüğü',
    value: '150-250 m²',
    icon: <Building size={24} />,
  },
  {
    title: 'Deneyim',
    value: 'Tercih edilir',
    icon: <Award size={24} />,
  },
  {
    title: 'Süre',
    value: '10 yıl sözleşme',
    icon: <Clock size={24} />,
  },
];

const PROCESS_STEPS = [
  {
    number: '01',
    title: 'Başvuru',
    description: 'Online başvuru formunu doldurun.',
  },
  {
    number: '02',
    title: 'Görüşme',
    description: 'Ekibimizle tanışma toplantısı.',
  },
  {
    number: '03',
    title: 'Değerlendirme',
    description: 'Yatırım ve lokasyon analizi.',
  },
  {
    number: '04',
    title: 'Sözleşme',
    description: 'Franchise sözleşmesinin imzalanması.',
  },
  {
    number: '05',
    title: 'Eğitim',
    description: 'Kapsamlı operasyon eğitimi.',
  },
  {
    number: '06',
    title: 'Açılış',
    description: 'Şubenizin büyük açılışı!',
  },
];

const PartnershipClient = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    investment: '',
    location: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
      const res = await fetch(`${apiUrl}/api/v1/partnership`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setIsSuccess(true);
        setTimeout(() => {
          setIsModalOpen(false);
          setIsSuccess(false);
          setFormData({
            fullName: '',
            email: '',
            phone: '',
            company: '',
            investment: '',
            location: '',
            message: '',
          });
        }, 3000);
      } else {
        alert('Bir hata oluştu. Lütfen tekrar deneyiniz.');
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert('Bir hata oluştu. Lütfen tekrar deneyiniz.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='min-h-screen bg-cream pt-28 md:pt-36'>
      <Container className='py-16'>
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className='text-center mb-20 max-w-4xl mx-auto'
        >
          <h2 className='font-heading text-3xl md:text-5xl font-extrabold text-gray-900 mb-6'>
            Kendi İşinizin Sahibi Olun! 🚀
          </h2>
          <p className='font-body text-lg text-gray-600 leading-relaxed mb-8'>
            Antepli Mutfağı franchise sistemi ile kanıtlanmış bir iş modelinin
            sahibi olun. Güçlü marka desteği, kapsamlı eğitim ve sürekli
            operasyon desteği ile başarıya ulaşın.
          </p>
          <Button
            variant='primary'
            size='lg'
            onClick={() => setIsModalOpen(true)}
            className='text-lg px-12 py-4'
          >
            Hemen Başvur
          </Button>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className='grid grid-cols-2 md:grid-cols-4 gap-6 mb-20'
        >
          {STATS.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className='bg-white rounded-3xl p-8 text-center shadow-lg border border-gray-100'
            >
              <div className='text-primary-500 flex justify-center mb-4'>
                {stat.icon}
              </div>
              <div className='font-heading text-4xl font-extrabold text-gray-900 mb-2'>
                {stat.value}
              </div>
              <div className='text-sm text-gray-600 font-medium'>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Benefits Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className='mb-20'
        >
          <h2 className='font-heading text-3xl md:text-4xl font-extrabold text-gray-900 text-center mb-12'>
            Neden Antepli Mutfağı Franchise?
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {BENEFITS.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className='bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all'
              >
                <div className='w-14 h-14 bg-primary-500/10 rounded-2xl flex items-center justify-center mb-6 text-primary-600'>
                  {benefit.icon}
                </div>
                <h3 className='font-heading text-xl font-bold text-gray-900 mb-3'>
                  {benefit.title}
                </h3>
                <p className='text-gray-600 leading-relaxed'>
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Requirements Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className='mb-20'
        >
          <h2 className='font-heading text-3xl md:text-4xl font-extrabold text-gray-900 text-center mb-12'>
            Franchise Gereksinimleri
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
            {REQUIREMENTS.map((req, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className='bg-gradient-to-br from-primary-500 to-primary-600 rounded-3xl p-8 text-white text-center shadow-xl'
              >
                <div className='w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4'>
                  {req.icon}
                </div>
                <h3 className='font-heading text-2xl font-extrabold mb-2'>
                  {req.value}
                </h3>
                <p className='text-white/90 font-medium'>{req.title}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Process Steps */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className='mb-20'
        >
          <h2 className='font-heading text-3xl md:text-4xl font-extrabold text-gray-900 text-center mb-12'>
            Franchise Süreci
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {PROCESS_STEPS.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 + index * 0.1 }}
                className='relative'
              >
                <div className='flex items-start gap-4'>
                  <div className='flex-shrink-0 w-16 h-16 bg-primary-500 text-white rounded-2xl flex items-center justify-center font-heading text-2xl font-extrabold shadow-lg'>
                    {step.number}
                  </div>
                  <div className='flex-1'>
                    <h3 className='font-heading text-xl font-bold text-gray-900 mb-2'>
                      {step.title}
                    </h3>
                    <p className='text-gray-600 leading-relaxed'>
                      {step.description}
                    </p>
                  </div>
                </div>
                {index < PROCESS_STEPS.length - 1 && (
                  <div className='hidden lg:block absolute top-8 -right-4 w-8 h-0.5 bg-gray-200' />
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className='bg-gradient-to-br from-primary-500 via-primary-600 to-orange-600 rounded-[3rem] p-12 md:p-16 text-white text-center shadow-2xl'
        >
          <h2 className='font-heading text-3xl md:text-5xl font-extrabold mb-6'>
            Hayalinizdeki İşe Başlamaya Hazır mısınız?
          </h2>
          <p className='text-xl text-white/90 mb-8 max-w-2xl mx-auto'>
            Size özel franchise paketimiz hakkında detaylı bilgi almak için
            hemen başvurun. Ekibimiz en kısa sürede sizinle iletişime geçecek.
          </p>
          <Button
            variant='secondary'
            size='lg'
            onClick={() => setIsModalOpen(true)}
            className='text-lg px-12 py-4 bg-white text-primary-600 hover:bg-gray-50'
          >
            Başvuru Formu
          </Button>
        </motion.div>
      </Container>

      {/* Application Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4'
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 50 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className='bg-white rounded-[2.5rem] max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl'
              onClick={(e) => e.stopPropagation()}
            >
              {isSuccess ? (
                <div className='p-12 text-center'>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', damping: 15, stiffness: 300 }}
                  >
                    <div className='w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6'>
                      <CheckCircle size={48} className='text-green-600' />
                    </div>
                  </motion.div>
                  <h3 className='font-heading text-3xl font-extrabold text-gray-900 mb-4'>
                    Başvurunuz Alındı! 🎉
                  </h3>
                  <p className='text-gray-600 text-lg'>
                    Franchise ekibimiz en kısa sürede sizinle iletişime geçecek.
                    Teşekkür ederiz!
                  </p>
                </div>
              ) : (
                <>
                  <div className='sticky top-0 bg-white rounded-t-[2.5rem] border-b border-gray-100 p-8 flex justify-between items-start z-10'>
                    <div>
                      <h3 className='font-heading text-2xl md:text-3xl font-extrabold text-gray-900 mb-2'>
                        Franchise Başvuru Formu
                      </h3>
                      <p className='text-gray-600'>
                        Bilgilerinizi doldurun, sizinle iletişime geçelim.
                      </p>
                    </div>
                    <button
                      onClick={() => setIsModalOpen(false)}
                      className='p-2 hover:bg-gray-100 rounded-full transition-colors'
                    >
                      <X size={24} className='text-gray-600' />
                    </button>
                  </div>

                  <div className='p-8'>
                    <form onSubmit={handleSubmit} className='space-y-6'>
                      <div>
                        <label className='block text-sm font-bold text-gray-700 mb-2'>
                          Ad Soyad *
                        </label>
                        <div className='relative'>
                          <User
                            size={20}
                            className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400'
                          />
                          <input
                            type='text'
                            name='fullName'
                            value={formData.fullName}
                            onChange={handleInputChange}
                            required
                            className='w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all font-ui'
                            placeholder='Adınız ve soyadınız'
                          />
                        </div>
                      </div>

                      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                        <div>
                          <label className='block text-sm font-bold text-gray-700 mb-2'>
                            E-posta *
                          </label>
                          <div className='relative'>
                            <Mail
                              size={20}
                              className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400'
                            />
                            <input
                              type='email'
                              name='email'
                              value={formData.email}
                              onChange={handleInputChange}
                              required
                              className='w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all font-ui'
                              placeholder='ornek@email.com'
                            />
                          </div>
                        </div>

                        <div>
                          <label className='block text-sm font-bold text-gray-700 mb-2'>
                            Telefon *
                          </label>
                          <div className='relative'>
                            <Phone
                              size={20}
                              className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400'
                            />
                            <input
                              type='tel'
                              name='phone'
                              value={formData.phone}
                              onChange={handleInputChange}
                              required
                              className='w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all font-ui'
                              placeholder='0555 123 45 67'
                            />
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className='block text-sm font-bold text-gray-700 mb-2'>
                          Şirket Adı (Opsiyonel)
                        </label>
                        <div className='relative'>
                          <Building
                            size={20}
                            className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400'
                          />
                          <input
                            type='text'
                            name='company'
                            value={formData.company}
                            onChange={handleInputChange}
                            className='w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all font-ui'
                            placeholder='Şirket adınız'
                          />
                        </div>
                      </div>

                      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                        <div>
                          <label className='block text-sm font-bold text-gray-700 mb-2'>
                            Yatırım Kapasitesi *
                          </label>
                          <div className='relative'>
                            <Wallet
                              size={20}
                              className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400'
                            />
                            <select
                              name='investment'
                              value={formData.investment}
                              onChange={handleInputChange}
                              required
                              className='w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all font-ui appearance-none'
                            >
                              <option value=''>Seçiniz</option>
                              <option value='2-3M'>₺2M - ₺3M</option>
                              <option value='3-4M'>₺3M - ₺4M</option>
                              <option value='4M+'>₺4M+</option>
                            </select>
                          </div>
                        </div>

                        <div>
                          <label className='block text-sm font-bold text-gray-700 mb-2'>
                            Tercih Edilen Lokasyon *
                          </label>
                          <div className='relative'>
                            <MapPin
                              size={20}
                              className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400'
                            />
                            <input
                              type='text'
                              name='location'
                              value={formData.location}
                              onChange={handleInputChange}
                              required
                              className='w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all font-ui'
                              placeholder='Şehir/İlçe'
                            />
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className='block text-sm font-bold text-gray-700 mb-2'>
                          Mesajınız
                        </label>
                        <div className='relative'>
                          <FileText
                            size={20}
                            className='absolute left-4 top-4 text-gray-400'
                          />
                          <textarea
                            name='message'
                            value={formData.message}
                            onChange={handleInputChange}
                            rows={4}
                            className='w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all resize-none font-ui'
                            placeholder='Franchise hakkında sormak istedikleriniz...'
                          />
                        </div>
                      </div>

                      <Button
                        type='submit'
                        variant='primary'
                        className='w-full py-4 text-lg font-bold'
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <span className='flex items-center justify-center gap-2'>
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{
                                repeat: Infinity,
                                duration: 1,
                                ease: 'linear',
                              }}
                            >
                              ⏳
                            </motion.div>
                            Gönderiliyor...
                          </span>
                        ) : (
                          'Başvuruyu Gönder'
                        )}
                      </Button>
                    </form>
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PartnershipClient;
