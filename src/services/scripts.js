const getDate = () => {
  return new Date().toISOString();
}

const getCommunity = (age) => {
  switch(age){
    case age < 25:
      return 1
    case age < 35:
      return 2
    case age >= 35:
      return 3    
    default:
      return 2;
  }
};

const formatZones = (zones) => {
  return zones.map(zone => {
    const groups = zone.groups_;
    const groupsCount = groups.length;
    const totalPeople = groups.reduce((acc, g) => acc + g._count.users, 0);

    return {
      id: zone.id,
      zone_id: zone.zone_id,
      leader: zone.users ? `${zone.users.name} ${zone.users.last_name}` : null,
      groupsCount,
      totalPeople,
      groupIds: groups.map(g => g.group_id),
    };
  });
};

export {
  getDate,
  getCommunity,
  formatZones
}