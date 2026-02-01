import { setServers, resolveSrv, resolveTxt } from 'dns';
import { promisify } from 'util';

const resolveSrvAsync = promisify(resolveSrv);
const resolveTxtAsync = promisify(resolveTxt);

setServers(['8.8.8.8']);

const HOST = 'antepli-pizza.on17ni5.mongodb.net';
const SRV_ADDR = `_mongodb._tcp.${HOST}`;

async function resolve() {
  console.log(`Resolving ${HOST}...`);
  try {
    const addresses = await resolveSrvAsync(SRV_ADDR);
    console.log('SRV Records:', addresses);

    const txtParams = await resolveTxtAsync(HOST);
    // TXT records usually contain: "authSource=admin&replicaSet=atlas-..."
    const options = txtParams.flat().join('');

    const hosts = addresses.map((a) => `${a.name}:${a.port}`).join(',');

    const StandardURI = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${hosts}/${process.env.DB_NAME}?ssl=true&${options}`;

    console.log('\n✅ STANDARD CONNECTION STRING (Use this in .env.local):');
    console.log(
      `mongodb://<user>:<pass>@${hosts}/<dbname>?ssl=true&${options}`,
    );

    // Since we don't have user/pass in this script context easily without parsing env again, just printing the host part is enough.
  } catch (err) {
    console.error('Resolution failed:', err);
  }
}

resolve();
