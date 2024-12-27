const AddDelay = async (ms: number): Promise<number> => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms, 0);
  });
};

const Spawn = async (): Promise<void> => {
  try {
    const playerIndex: number = GetPlayerIndex();
    const playerSrc: number = GetPlayerServerId(playerIndex);
    const playerPed: number = PlayerPedId();

    emit("Screens/team-choose", false, "");

    NetworkResurrectLocalPlayer(714.04, 2523.2, 45.56, 0, 1000, false);
    DoScreenFadeOut(0);
    SetEntityCoordsNoOffset(playerPed, 1714.04, 2523.2, 45.56, false, false, false);
    RemoveAllCoverBlockingAreas();
    RemoveAllPedWeapons(playerPed, false);
    await AddDelay(1600);
    DoScreenFadeIn(1600);
    SetCanAttackFriendly(playerPed, true, true);
    DisableIdleCamera(true);
    DisplayRadar(true);
    DistantCopCarSirens(true);
    AddRelationshipGroup("CRIMINAL");
    AddRelationshipGroup("POLICE");
    SetRelationshipBetweenGroups(3, "CRIMINAL", "POLICE");
    await AddDelay(5000);

    const prisonBlip = AddBlipForCoord(1768.01, 2560.49, 45.56);
    SetBlipSprite(prisonBlip, 809);
    SetBlipScale(prisonBlip, 1.0);
    SetBlipColour(prisonBlip, 17);
    SetBlipAsShortRange(prisonBlip, false);
    BeginTextCommandSetBlipName("STRING");
    AddTextComponentString("Prison");
    EndTextCommandSetBlipName(prisonBlip);

    const policestationBlip = AddBlipForCoord(446.13, -986.33, 30.69);
    SetBlipSprite(policestationBlip, 41);
    SetBlipScale(policestationBlip, 1.0);
    SetBlipColour(policestationBlip, 38);
    SetBlipAsShortRange(policestationBlip, false);
    BeginTextCommandSetBlipName("STRING");
    AddTextComponentString("Police Station");
    EndTextCommandSetBlipName(policestationBlip);

    emitNet("Core/Server/Player:Sync", playerSrc);
  } catch (error: unknown) {
    if (error instanceof Error) console.error(error.message);
  }
};

Spawn();
