namespace modtracker;
using HarmonyLib;
using Newtonsoft.Json;

public class SomeGameClass
{
    public bool isRunning;
    public int counter;

    private int DoSomething()
    {
        if (isRunning)
        {
            counter++;
        }
        return counter * 10;
    }

    static async Task PostAsync(HttpClient httpClient)
{
    using StringContent content = new(JsonConvert.SerializeObject(new
    {
      
    }));

    using HttpResponseMessage response = await httpClient.PostAsync(
      "todos",
      content
      );
}

}

public class MyPatcher
{
    // make sure DoPatching() is called at start either by
    // the mod loader or by your injector

    public static void DoPatching()
    {
        var harmony = new Harmony("com.example.patch");
        harmony.PatchAll();
    }
}

[HarmonyPatch(typeof(SomeGameClass))]
[HarmonyPatch("DoSomething")] // if possible use nameof() here
class Patch01
{
    static AccessTools.FieldRef<SomeGameClass, bool> isRunningRef =
        AccessTools.FieldRefAccess<SomeGameClass, bool>("isRunning");

    static bool Prefix(SomeGameClass __instance, ref int ___counter)
    {
        isRunningRef(__instance) = true;
        if (___counter > 100)
            return false;
        ___counter = 0;
        return true;
    }

    static void Postfix(ref int __result) => __result *= 2;
}