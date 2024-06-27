import { useMemo } from 'react';

import { paths } from 'src/routes/paths';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

const icon = (name: string) => (
  // <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
  // OR
  <Iconify icon={name} />
  // https://icon-sets.iconify.design/solar/
  // https://www.streamlinehq.com/icons
);

const ICONS = {
  job: icon('ic_job'),
  blog: icon('ic_blog'),
  chat: icon('ic_chat'),
  mail: icon('ic_mail'),
  user: icon('ic_user'),
  file: icon('ic_file'),
  lock: icon('ic_lock'),
  tour: icon('ic_tour'),
  order: icon('ic_order'),
  label: icon('ic_label'),
  blank: icon('ic_blank'),
  kanban: icon('ic_kanban'),
  folder: icon('ic_folder'),
  banking: icon('ic_banking'),
  booking: icon('ic_booking'),
  invoice: icon('ic_invoice'),
  product: icon('ic_product'),
  calendar: icon('ic_calendar'),
  disabled: icon('ic_disabled'),
  external: icon('ic_external'),
  menuItem: icon('ic_menu_item'),
  ecommerce: icon('ic_ecommerce'),
  analytics: icon('ic_analytics'),
  dashboard: icon('ic:round-dashboard'),
  properties: icon('material-symbols:cottage-rounded'),
  tenancies: icon('material-symbols:vpn-key-outline-rounded'),
  finances: icon('material-symbols:account-balance-outline-rounded'),
  documents: icon('ep:document'),
  settings: icon('ic:outline-settings'),
  reminders: icon('mdi:calendar-outline')
};

// ----------------------------------------------------------------------

export function useNavData() {
  const data = useMemo(
    () => [
      // OVERVIEW
      // ----------------------------------------------------------------------
      {
        subheader: 'propertycontrol360',
        items: [
          { title: 'dashboard', path: paths.dashboard.root, icon: ICONS.dashboard },
          {
            title: 'users',
            path: paths.dashboard.users.root,
            icon: ICONS.finances,
          },
          {
            title: 'errorLogs',
            path: paths.dashboard.errorLogs.root,
            icon: ICONS.documents,
          },
        ],
      },
    ],
    []
  );

  return data;
}
