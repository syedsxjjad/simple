import dataJson from '@/locales/en.json';

const AuthStats = () => {
  const stats = [
    dataJson.authLayout.stats.trainers,
    dataJson.authLayout.stats.horses,
    dataJson.authLayout.stats.satisfaction,
  ];

  return (
    <div className="mt-10 grid lg:grid-cols-3 grid-cols-2 gap-8 w-full">
      {stats.map(stat => (
        <div key={stat.label} className="flex flex-col items-center">
          <span className="text-secondary-light lg:text-4xl text-2xl font-bold leading-none">{stat.value}</span>
          <span className="text-placeholder text-lg font-sora font-normal mt-2">{stat.label}</span>
        </div>
      ))}
    </div>
  );
};

export default AuthStats;
