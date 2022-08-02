import { DiaDasMaes } from './components/DiaDasMaes/index';
import { DiaDosNamorados } from './components/DiaDosNamorados/index';
import { DiaDosPais } from './components/DiaDosPais/index';
import { Natal } from './components/Natal/index';
import { Natal2021 } from './components/Natal2021';
import { BlackFriday } from './components/BlackFriday/index';
import { AppMrCat } from './components/AppMrCat/index';
import { MrCatFom } from './components/MrCatFom/index';
import { DiaDosPais2022 } from './components/DiaDosPais2022/index';
import { DiaDosPais2022Final } from './components/DiaDosPais2022Final';

import { Livelo } from './components/Livelo/index';
import { LightLeader } from './components/LightLeader';
import { AnabelaPabi } from './components/AnabelaPabi';
import { EuDeMrCat } from './components/EuDeMrCat';
import { Flow } from './components/Flow';
import { KitDiaDosPais } from './components/KitDiaDosPais';
import { LeveOBem } from './components/LeveOBem';
import { Pabis } from './components/Pabis';
import { Moleskine } from './components/Moleskine';
import { ReaberturaLojas } from './components/ReaberturaLojas';
import { FlowBio } from './components/FlowBio';
import { Socks } from './components/Socks';
import { Zen } from './components/Zen';
import { Alive } from './components/Alive';
import { Aniversario } from './components/AniversarioMrCat';
import { PostIt } from './components/Post-It';
import { SpecialFriday } from './components/SpecialFriday';
import { MIA } from './components/MIA';
import { Omnichannel } from './components/Omnichannel';
import { DiaDosPaisGame } from './components/DiaDosPaisGame'

export const LandingPages = () => {
    $('body').hasClass('diadospais-2022') && DiaDosPaisGame();
    $('body').hasClass('dia-das-maes') && DiaDasMaes();
    $('body').hasClass('x-dia-dos-namorados') && DiaDosNamorados();
    $('body').hasClass('x-dia-dos-pais') && DiaDosPais();
    $('body').hasClass('x-natal') && Natal();
    $('body').hasClass('x-natal-2021') && Natal2021();
    $('body').hasClass('x-black-friday') && BlackFriday();
    $('body').hasClass('x-app-mrcat') && AppMrCat();
    $('body').hasClass('x-diadospais-2022') && DiaDosPais2022();

    $('body').hasClass('x-diadospais-2022-final') && DiaDosPais2022Final();

    $('body').hasClass('x-mrcat-fom') && MrCatFom();
    $('body').hasClass('x-livelo') && Livelo();
    $('body').hasClass('x-post-it') && PostIt();
    $('body').hasClass('x-light-leather') && LightLeader();
    $('body').hasClass('x-pabi') && AnabelaPabi();
    $('body').hasClass('x-eu-de-mrcat') && EuDeMrCat();
    $('body').hasClass('x-flow') && Flow();
    $('body').hasClass('x-kit-dia-dos-pais') && KitDiaDosPais();
    $('body').hasClass('x-leve-o-bem') && LeveOBem();
    $('body').hasClass('x-pabis') && Pabis();
    $('body').hasClass('x-moleskine') && Moleskine();
    $('body').hasClass('x-reabertura-lojas') && ReaberturaLojas();
    $('body').hasClass('x-flow-bio') && FlowBio();
    $('body').hasClass('x-socks') && Socks();
    $('body').hasClass('x-zen') && Zen();
    $('body').hasClass('x-alive') && Alive();
    $('body').hasClass('x-aniversario') && Aniversario();
    $('body').hasClass('x-mia') && MIA();
    $('body').hasClass('x-omnichannel') && Omnichannel();
}
