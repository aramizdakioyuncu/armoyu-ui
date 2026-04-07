import { Button } from '../../Button';
import { Slider } from '../../Slider';
import { GenderStatsBar } from '../../GenderStatsBar';
import { StatsGrid } from '../../StatsGrid';
import { MOCK_NEWS, mockGlobalStats } from "../../../lib/constants/seedData";

export function Introduction() {
  return (
    <div className="flex flex-col items-center min-h-[80vh] text-center space-y-16 animate-in fade-in duration-1000 pb-16 pt-4">

      {/* Hero Slider */}
      <div className="w-full h-[500px] lg:h-[600px]">
        <Slider durationTime={6000} />
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <Button variant="primary" className="h-14 px-10 text-lg rounded-full shadow-lg shadow-blue-500/30">
          Hemen Aramıza Katıl
        </Button>
        <Button variant="secondary" className="h-14 px-10 text-lg rounded-full shadow-lg border-white/20">
          Sosyal Akışı Keşfet
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl text-left relative z-10">
        {[
          { title: 'Topluluk', desc: 'Binlerce oyuncuyla tanışın ve ekipler kurun.' },
          { title: 'Forum', desc: 'Oyunlar hakkında tartışın, rehberler oluşturun.' },
          { title: 'Minecraft', desc: 'mc.armoyu.com adresinden sunucumuza katılın.' }
        ].map((feature, i) => (
          <div key={i} className="glass-panel p-6 rounded-3xl hover:-translate-y-2 transition-transform duration-300 border border-white/5 shadow-xl">
            <h3 className="text-xl font-bold mb-2 text-white">{feature.title}</h3>
            <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
          </div>
        ))}
      </div>

      {/* Topluluk Dağılımı ve İstatistikleri */}
      <div className="w-full max-w-5xl mt-12 glass-panel p-8 md:p-12 rounded-3xl border border-white/5 relative z-10 shadow-2xl flex flex-col gap-10">

        {/* Gender Stats */}
        <div>
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 text-center">Topluluk Demografisi</h3>
          <p className="text-gray-400 text-center mb-10 max-w-2xl mx-auto">
            Zengin ve çeşitli oyuncu ekosistemimizde her geçen gün birlikte daha büyük projelere ve eğlencelere imza atıyoruz.
          </p>
          <GenderStatsBar maleCount={mockGlobalStats.malePlayers} femaleCount={mockGlobalStats.femalePlayers} />
        </div>

        {/* Global Stats Grid */}
        <div className="border-t border-white/10 pt-10">
          <h3 className="text-xl md:text-2xl font-bold text-white mb-6 text-left">Genel İstatistikler</h3>
          <StatsGrid stats={mockGlobalStats} />
        </div>

      </div>

    </div>
  );
}
