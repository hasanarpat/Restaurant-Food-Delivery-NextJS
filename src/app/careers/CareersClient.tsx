'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Container from '@/components/ui/Container';
import PageHeader from '@/components/ui/PageHeader';
import Button from '@/components/ui/Button';
import {
  Briefcase,
  MapPin,
  Clock,
  Users,
  ChefHat,
  Bike,
  Star,
  X,
  Upload,
  Mail,
  Phone,
  User,
  Linkedin,
  FileText,
  CheckCircle,
} from 'lucide-react';

interface JobPosting {
  id: string;
  title: string;
  department: string;
  location: string;
  type: 'Tam Zamanlı' | 'Yarı Zamanlı' | 'Staj';
  requirements: string[];
  description: string;
  icon: React.ReactNode;
}

const JOBS: JobPosting[] = [
  {
    id: '1',
    title: 'Baş Aşçı',
    department: 'Mutfak',
    location: 'Alsancak Şubesi',
    type: 'Tam Zamanlı',
    icon: <ChefHat size={32} />,
    description:
      'Mutfağımızın lider aşçısı olarak menü geliştirme, kalite kontrol ve ekip yönetiminden sorumlu olacaksınız.',
    requirements: [
      'En az 5 yıl deneyim',
      'Türk mutfağı uzmanlığı',
      'Liderlik yetenekleri',
      'Sağlık sertifikası',
    ],
  },
  {
    id: '2',
    title: 'Garson / Garson',
    department: 'Servis',
    location: 'Tüm Şubeler',
    type: 'Tam Zamanlı',
    icon: <Users size={32} />,
    description:
      'Misafirlerimize özenli hizmet sunarak unutulmaz bir deneyim yaşatacaksınız.',
    requirements: [
      'İletişim becerileri',
      'Deneyim tercih edilir',
      'Esnek çalışma saatleri',
      'Takım çalışmasına yatkınlık',
    ],
  },
  {
    id: '3',
    title: 'Kurye',
    department: 'Teslimat',
    location: 'Karşıyaka, Bornova',
    type: 'Yarı Zamanlı',
    icon: <Bike size={32} />,
    description:
      'Siparişleri zamanında ve güvenli bir şekilde müşterilerimize ulaştıracaksınız.',
    requirements: [
      'Sürücü belgesi (B sınıfı)',
      'Motor/Araba sahibi olmak',
      'Bölge bilgisi',
      'Ekip çalışmasına uyum',
    ],
  },
  {
    id: '4',
    title: 'Restoran Müdürü',
    department: 'Yönetim',
    location: 'Alsancak Şubesi',
    type: 'Tam Zamanlı',
    icon: <Briefcase size={32} />,
    description:
      'Şube operasyonlarını yönetecek, ekibi koordine edecek ve müşteri memnuniyetini sağlayacaksınız.',
    requirements: [
      'En az 3 yıl yöneticilik deneyimi',
      'Restoran sektörü bilgisi',
      'İnsan kaynakları yönetimi',
      'Analitik düşünme',
    ],
  },
  {
    id: '5',
    title: 'Aşçı Yardımcısı',
    department: 'Mutfak',
    location: 'Bornova Şubesi',
    type: 'Tam Zamanlı',
    icon: <ChefHat size={32} />,
    description:
      'Aşçılarımıza destek olarak mutfak operasyonlarının sorunsuz işlemesini sağlayacaksınız.',
    requirements: [
      'Mutfak deneyimi tercih edilir',
      'Hızlı öğrenme yeteneği',
      'Temizlik ve hijyen bilinci',
      'Fiziksel olarak aktif',
    ],
  },
  {
    id: '6',
    title: 'Stajyer (Mutfak/Servis)',
    department: 'Tüm Departmanlar',
    location: 'Tüm Şubeler',
    type: 'Staj',
    icon: <Star size={32} />,
    description:
      'Kariyer yolculuğunuza başlamanız için harika bir fırsat! Deneyimli ekibimizden öğrenin.',
    requirements: [
      'Üniversite öğrencisi',
      'Hevesli ve öğrenmeye açık',
      'İletişim becerileri',
      'Esnek çalışma saatleri',
    ],
  },
];

const CareersClient = () => {
  const [selectedJob, setSelectedJob] = useState<JobPosting | null>(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    linkedin: '',
    coverLetter: '',
  });
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCvFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSuccess(true);

    // Reset after 3 seconds
    setTimeout(() => {
      setSelectedJob(null);
      setIsSuccess(false);
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        linkedin: '',
        coverLetter: '',
      });
      setCvFile(null);
    }, 3000);
  };

  const closeModal = () => {
    setSelectedJob(null);
    setIsSuccess(false);
  };

  return (
    <div className='min-h-screen bg-cream'>
      <PageHeader
        title='Kariyer Fırsatları'
        description='Antepli Mutfağı ailesine katılın ve kariyerinizi bizimle şekillendirin'
      />

      <Container className='py-16'>
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className='text-center mb-16 max-w-3xl mx-auto'
        >
          <h2 className='font-heading text-3xl md:text-4xl font-extrabold text-gray-900 mb-6'>
            Ekibimize Katılın! 🎉
          </h2>
          <p className='font-body text-lg text-gray-600 leading-relaxed'>
            Antepli Mutfağı olarak, tutkulu ve yetenekli insanlarla çalışmaktan
            gurur duyuyoruz. Siz de bu güzel ailenin bir parçası olun! Aşağıdaki
            açık pozisyonları inceleyin ve kariyerinizde yeni bir başlangıç
            yapın.
          </p>
        </motion.div>

        {/* Job Listings Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16'>
          {JOBS.map((job, index) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.03, y: -5 }}
              className='bg-white/80 backdrop-blur-sm rounded-[2rem] p-8 shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 cursor-pointer group'
              onClick={() => setSelectedJob(job)}
            >
              <div className='flex items-center justify-between mb-6'>
                <div className='p-4 bg-primary-500/10 text-primary-600 rounded-2xl group-hover:bg-primary-500 group-hover:text-white transition-all duration-300'>
                  {job.icon}
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold ${
                    job.type === 'Tam Zamanlı'
                      ? 'bg-green-100 text-green-700'
                      : job.type === 'Yarı Zamanlı'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-purple-100 text-purple-700'
                  }`}
                >
                  {job.type}
                </span>
              </div>

              <h3 className='font-heading text-2xl font-extrabold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors'>
                {job.title}
              </h3>
              <p className='text-sm font-semibold text-primary-600 mb-4'>
                {job.department}
              </p>

              <div className='space-y-2 mb-6'>
                <div className='flex items-center gap-2 text-sm text-gray-600'>
                  <MapPin size={16} className='text-primary-500' />
                  <span>{job.location}</span>
                </div>
                <div className='flex items-center gap-2 text-sm text-gray-600'>
                  <Clock size={16} className='text-primary-500' />
                  <span>{job.type}</span>
                </div>
              </div>

              <p className='text-sm text-gray-600 mb-6 line-clamp-3 leading-relaxed'>
                {job.description}
              </p>

              <div className='flex flex-wrap gap-2 mb-6'>
                {job.requirements.slice(0, 2).map((req, i) => (
                  <span
                    key={i}
                    className='px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium'
                  >
                    {req}
                  </span>
                ))}
                {job.requirements.length > 2 && (
                  <span className='px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium'>
                    +{job.requirements.length - 2} daha
                  </span>
                )}
              </div>

              <Button
                variant='primary'
                className='w-full group-hover:scale-105 transition-transform'
              >
                Başvur
              </Button>
            </motion.div>
          ))}
        </div>

        {/* Why Work With Us Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className='bg-gradient-to-br from-primary-500 to-primary-600 rounded-[3rem] p-12 text-white shadow-2xl'
        >
          <h2 className='font-heading text-3xl md:text-4xl font-extrabold mb-8 text-center'>
            Neden Bizimle Çalışmalısınız?
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            <div className='text-center'>
              <div className='w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4'>
                <Star size={32} />
              </div>
              <h3 className='font-heading text-xl font-bold mb-2'>
                Kariyer Gelişimi
              </h3>
              <p className='text-white/90'>
                Sürekli eğitim ve gelişim fırsatları ile kariyerinizi ilerletin.
              </p>
            </div>
            <div className='text-center'>
              <div className='w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4'>
                <Users size={32} />
              </div>
              <h3 className='font-heading text-xl font-bold mb-2'>
                Takım Ruhu
              </h3>
              <p className='text-white/90'>
                Samimi ve destekleyici bir ekip ortamında çalışın.
              </p>
            </div>
            <div className='text-center'>
              <div className='w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4'>
                <Briefcase size={32} />
              </div>
              <h3 className='font-heading text-xl font-bold mb-2'>
                Rekabetçi Maaş
              </h3>
              <p className='text-white/90'>
                Adil ücretlendirme ve ek yan haklar ile değerinizi bilin.
              </p>
            </div>
          </div>
        </motion.div>
      </Container>

      {/* Application Modal */}
      <AnimatePresence>
        {selectedJob && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4'
            onClick={closeModal}
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
                    En kısa sürede sizinle iletişime geçeceğiz. Teşekkür ederiz!
                  </p>
                </div>
              ) : (
                <>
                  <div className='sticky top-0 bg-white rounded-t-[2.5rem] border-b border-gray-100 p-8 flex justify-between items-start z-10'>
                    <div>
                      <h3 className='font-heading text-2xl md:text-3xl font-extrabold text-gray-900 mb-2'>
                        {selectedJob.title}
                      </h3>
                      <p className='text-primary-600 font-semibold'>
                        {selectedJob.department} • {selectedJob.location}
                      </p>
                    </div>
                    <button
                      onClick={closeModal}
                      className='p-2 hover:bg-gray-100 rounded-full transition-colors'
                    >
                      <X size={24} className='text-gray-600' />
                    </button>
                  </div>

                  <div className='p-8'>
                    {/* Job Details */}
                    <div className='mb-8'>
                      <h4 className='font-heading text-xl font-bold text-gray-900 mb-4'>
                        Pozisyon Hakkında
                      </h4>
                      <p className='text-gray-700 leading-relaxed mb-6'>
                        {selectedJob.description}
                      </p>

                      <h4 className='font-heading text-xl font-bold text-gray-900 mb-4'>
                        Aranan Nitelikler
                      </h4>
                      <ul className='space-y-2'>
                        {selectedJob.requirements.map((req, i) => (
                          <li
                            key={i}
                            className='flex items-start gap-3 text-gray-700'
                          >
                            <CheckCircle
                              size={20}
                              className='text-green-500 mt-0.5 flex-shrink-0'
                            />
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Application Form */}
                    <div className='bg-gray-50/80 rounded-3xl p-8 border border-gray-100'>
                      <h4 className='font-heading text-xl font-bold text-gray-900 mb-6'>
                        Başvuru Formu
                      </h4>
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

                        <div>
                          <label className='block text-sm font-bold text-gray-700 mb-2'>
                            LinkedIn Profili (Opsiyonel)
                          </label>
                          <div className='relative'>
                            <Linkedin
                              size={20}
                              className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400'
                            />
                            <input
                              type='url'
                              name='linkedin'
                              value={formData.linkedin}
                              onChange={handleInputChange}
                              className='w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all font-ui'
                              placeholder='linkedin.com/in/kullaniciadi'
                            />
                          </div>
                        </div>

                        <div>
                          <label className='block text-sm font-bold text-gray-700 mb-2'>
                            CV / Özgeçmiş *
                          </label>
                          <div className='relative'>
                            <input
                              type='file'
                              accept='.pdf,.doc,.docx'
                              onChange={handleFileChange}
                              required
                              className='hidden'
                              id='cv-upload'
                            />
                            <label
                              htmlFor='cv-upload'
                              className='flex items-center gap-3 w-full p-4 border-2 border-dashed border-gray-300 rounded-xl hover:border-primary-500 hover:bg-primary-50 transition-all cursor-pointer'
                            >
                              <Upload size={24} className='text-gray-400' />
                              <div className='flex-1'>
                                {cvFile ? (
                                  <p className='text-sm font-semibold text-gray-900'>
                                    {cvFile.name}
                                  </p>
                                ) : (
                                  <>
                                    <p className='text-sm font-semibold text-gray-700'>
                                      CV Yükle
                                    </p>
                                    <p className='text-xs text-gray-500'>
                                      PDF, DOC veya DOCX (Max 5MB)
                                    </p>
                                  </>
                                )}
                              </div>
                            </label>
                          </div>
                        </div>

                        <div>
                          <label className='block text-sm font-bold text-gray-700 mb-2'>
                            Motivasyon Mektubu *
                          </label>
                          <div className='relative'>
                            <FileText
                              size={20}
                              className='absolute left-4 top-4 text-gray-400'
                            />
                            <textarea
                              name='coverLetter'
                              value={formData.coverLetter}
                              onChange={handleInputChange}
                              required
                              rows={6}
                              className='w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all resize-none font-ui'
                              placeholder='Neden bu pozisyon için uygun olduğunuzu kısaca açıklayın...'
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
                            'Başvurunu Gönder'
                          )}
                        </Button>
                      </form>
                    </div>
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

export default CareersClient;
